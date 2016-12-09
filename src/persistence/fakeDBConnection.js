'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json').services.employees;
var Employee = require('../models/employee');
var faker = require('faker');

log.info('initialize fakeDB module');

if (config.persistence.fakeDB.locale !== undefined) {
    faker.locale = config.persistence.fakeDB.locale;
}

var employeesDB;

//todo extract persistence to separate file for faker, mock and dynamo/couch
function createAddress() {
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


function createJobHistory(dateOfBirth) {
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
            id: i + 1,
            companyName: faker.company.companyName() + ' ' + faker.company.companySuffix(),
            department: faker.name.jobArea(),
            jobTitle: faker.name.title(),
            dateStart: ds,
            dateEnd: de,
            address: createAddress()
        });
    }
    return jh;
}

function createEmployee() {
    var dob = faker.date.past(40, new Date('Sat Apr 01 1998 21:35:02 GMT+0200 (CEST)'));
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),

        imageUrl: faker.image.avatar(),
        jobTitle: faker.name.title(),
        department: faker.name.jobArea(),
        dateOfBirth: dob,

        address: createAddress(),
        jobHistory: createJobHistory(dob)
    };
}

function createFakeData() {
    log.info('fakeDB.createFakeData');
    if (employeesDB === undefined) {
        employeesDB = [];
        for (var i = 0; i < config.persistence.fakeDB.employeeCount; i++) {
            var e = new Employee(createEmployee());
            employeesDB.push(e);
        }
    }
    //define one fixed username for testing and developing purposes
    employeesDB[employeesDB.length - 1].userName = 'testuser';
    return employeesDB;
}

createFakeData();

// **************************************************************************
// Data Manipulation
// **************************************************************************

function getAllEmployees() {
    return employeesDB;
}

function getEmployeeByUserName(userName) {
    var retVal;
    for (let emp of employeesDB) {
        //db.getAllEmployees().foreach(function(emp) {
        if (emp.userName === userName) {
            retVal = emp;
            break;
        }
    }
    if (retVal === undefined) {
        throw new Error(userName + ' not found');
    }
    return retVal;
}

function deleteEmployee(userName) {
    for (var i = 0; i < employeesDB.length; i++) {
        //db.getAllEmployees().foreach(function(emp) {
        if (employeesDB[i].userName === userName) {
            employeesDB.splice(i, 1);
            break;
        }
    }
}

exports.getEmployeeByUserName = getEmployeeByUserName;
exports.getAllEmployees = getAllEmployees;
exports.deleteEmployee = deleteEmployee;
