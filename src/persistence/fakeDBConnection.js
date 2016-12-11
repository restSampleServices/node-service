'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json').services.employees;
var Job = require('../models/job');
var Employee = require('../models/employee');
var faker = require('faker');

log.info('initialize fakeDB module');

if (config.persistence.fakeDB.locale !== undefined) {
    faker.locale = config.persistence.fakeDB.locale;
}

var employeeDB;

//todo extract persistence to separate file for faker, mock and dynamo/couch
function provisionCreateAddress() {
    var street2;

    //randomize the street2 attribute
    if (Math.floor(Math.random() * 10) + 1 > 5) {
        street2 = faker.address.secondaryAddress();
    }

    return {
        country: faker.address.country(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
        street: faker.address.streetAddress(),
        street2: street2,
        geo: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    };
}


function provisionCreateJobHistory(dateOfBirth) {
    var jh = [];
    //TODO: create maximum age-18 / 2 jobs
    //use a randomized count between 0 and 7
    var companycount = Math.floor(Math.random() * 7) /*+ 1 activate if we want at least one*/ ;
    for (var i = 0; i < companycount; i++) {
        //TODO date start should be min last year
        var ds = faker.date.past(40, new Date());
        //TODO date end can be maximum today - 4 weeks
        var de = faker.date.future(20, new Date(ds));
        jh.push({
            id: (i + 1) + '',
            companyName: faker.company.companyName() + ' ' + faker.company.companySuffix(),
            department: faker.name.jobArea(),
            jobTitle: faker.name.title(),
            dateStart: ds,
            dateEnd: de,
            address: provisionCreateAddress()
        });
    }
    return jh;
}

function provisionCreateEmployee() {
    var dob = faker.date.past(40, new Date('Sat Apr 01 1998 21:35:02 GMT+0200 (CEST)'));
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),

        imageUrl: faker.image.avatar(),
        jobTitle: faker.name.title(),
        department: faker.name.jobArea(),
        dateOfBirth: dob,

        address: provisionCreateAddress(),
        jobHistory: provisionCreateJobHistory(dob)
    };
}

function createFakeData() {
    log.info('fakeDB.createFakeData');
    if (employeeDB === undefined) {
        employeeDB = [];
        for (var i = 0; i < config.persistence.fakeDB.employeeCount; i++) {
            var e = new Employee(provisionCreateEmployee());
            employeeDB.push(e);
        }
    }
    //define one fixed username for testing and developing purposes
    employeeDB[employeeDB.length - 1].userName = 'testuser';
    return employeeDB;
}

createFakeData();

// **************************************************************************
// Data Manipulation
// **************************************************************************

function getAllEmployees() {
    return employeeDB;
}

//returnUndefined not set or false --> function will throw an error if user was not found 
function getEmployeeByUserName(userName, returnUndefined) {
    log.info('database.getEmployeeByUserName');

    var retVal;
    for (let emp of employeeDB) {
        //db.getAllEmployees().foreach(function(emp) {
        if (emp.userName === userName) {
            retVal = emp;
            break;
        }
    }
    if (retVal === undefined && !returnUndefined) {
        throw new Error(userName + ' not found');
    }
    return retVal;
}

function getJobByUserNameAndId(userName, jobId) {
    log.info('database.getJobByUserNameAndId');

    var retVal;
    var jh = getEmployeeByUserName(userName).jobHistory;
    for (let job of jh) {
        log.debug('check ', JSON.stringify(job));
        jobId = jobId + ''; //convert to string
        if (job.id === jobId) {
            log.debug('found job');
            retVal = job;
            break;
        }
    }
    if (retVal === undefined) {
        throw new Error('user ' + userName + ' has no job ' + jobId + '');
    }
    return retVal;
}

function createEmployee(employee) {
    log.info('database.createEmployee');
    if (employee instanceof Employee) {
        if (getEmployeeByUserName(employee.userName, true) !== undefined) {
            throw new Error('a user with the specified username already exists');
        }
        employeeDB.push(employee);
    } else {
        throw new Error('expected Employee object');
    }

}

function deleteEmployee(userName) {
    log.info('database.deleteEmployee');

    for (var i = 0; i < employeeDB.length; i++) {
        //db.getAllEmployees().foreach(function(emp) {
        if (employeeDB[i].userName === userName) {
            employeeDB.splice(i, 1);
            break;
        }
    }
}

function createJob(userName, job) {
    log.info('database.createEmployee');
    if (job instanceof Job) {
        var jh = getEmployeeByUserName(userName).jobHistory;
        jh.push(job);
    } else {
        throw new Error('expected Employee object');
    }

}

function deleteJob(userName, jobId) {
    log.info('database.deleteJob');

    var jh = getEmployeeByUserName(userName).jobHistory;
    for (var i = 0; i < jh.length; i++) {
        if (jh[i].id === jobId) {
            jh.splice(i, 1);
            break;
        }
    }
}

//TODO: create a object for database instead of module
exports.getEmployeeByUserName = getEmployeeByUserName;
exports.getAllEmployees = getAllEmployees;
exports.createEmployee = createEmployee;
exports.deleteEmployee = deleteEmployee;

exports.getJobByUserNameAndId = getJobByUserNameAndId;
exports.createJob = createJob;
exports.deleteJob = deleteJob;
