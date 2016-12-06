'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json');
var Employee = require('../models/employee');


var defaultDB = 'mock';
log.debug('initialize productPersistence module');

var employeesMock;

function getAllEmployeesMock() {
    //curenntly delivering mock data, database connection will follow
    log.info('persistence.getAllEmployeesMock');
    if (employeesMock === undefined) {
        employeesMock = [];
        for (var i = 0; i < 10; i++) {
            employeesMock.push(new Employee({
                firstName: i.toString()
            }));
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
