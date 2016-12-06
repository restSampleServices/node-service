'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json');
var Employee = require('../models/employee');
var faker = require('faker');

var defaultDB = 'mock';
log.debug('initialize productPersistence module');

var employeesMock;
//todo extract persistence to separate file for faker, mock and dynamo/couch
function getAddress() {
    return {
        country: faker.address.country(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
        street: faker.address.streetAddress(),
        street2: faker.address.secondaryAddress(),
        geo: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        }
    };
}


function getJobHistory() {
    var jh = [];
    //TODO use a randomized count between 0 and 7
    for (var i = 0; i < 10; i++) {
        //TODO date start should be min last year
        var ds = faker.date.past(40, new Date());
        //TODO date end can be maximum today - 4 weeks
        var de = faker.date.future(20, new Date(ds));
        jh.push({
            companyName: faker.company.companyName() + ' ' + faker.company.companySuffix(),
            department: faker.name.jobArea(),
            jobTitle: faker.name.title(),
            dateStart: ds,
            dateEnd: de,
            address: getAddress()
        });
    }
    return jh;
}

function getAllEmployeesMock() {
    //curenntly delivering mock data, database connection will follow
    log.info('persistence.getAllEmployeesMock');
    if (employeesMock === undefined) {
        employeesMock = [];
        log.important(faker.fake('country: {{name.lastName}}, city: {{name.firstName}} street:{{name.suffix}}'));
        for (var i = 0; i < 10; i++) {
            var e = new Employee({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber(),
                //email: faker.internet.email(),

                imageUrl: faker.image.avatar(),
                jobTitle: faker.name.title(),
                department: faker.name.jobArea(),
                dateOfBirth: faker.date.past(40, new Date('Sat Apr 01 1998 21:35:02 GMT+0200 (CEST)')),

                address: getAddress(),
                jobHistory: getJobHistory()

            });
            employeesMock.push(e);
        }
    }
    return employeesMock;
}


function getAllEmployeesSwitcher() {
    log.info('persistence.getAllEmployees');
    return new Promise(function (resolve, reject) {
        var db = config.persistence.database || defaultDB;
        switch (db) {
            case 'mock':
                return resolve(getAllEmployeesMock());
            default:
                return reject(Error('not implemented yet'));
        }
    });
}

exports.getAllEmployees = getAllEmployeesSwitcher;
