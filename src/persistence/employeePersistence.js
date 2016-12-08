'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json').services.employees;
var Employee = require('../models/employee');
var db; // = require('./fakeDB'); = require('./couchDB');

var defaultDB = 'fakeDB';
log.info('initialize employeePersistence module');

function getAllEmployees() {
    log.info('persistence.getAllEmployees');
    return new Promise(function (resolve, reject) {
        try {
            resolve(db.getAllEmployees());
        } catch (e) {
            reject(e);
        }
    });
}

function getEmployeesByUserName(userName) {
    log.info('persistence.getAllEmployees');
    return new Promise(function (resolve, reject) {
        try {
            var employee = db.getEmployeeByUserName(userName);
            resolve(employee);
        } catch (e) {
            reject(e);
        }
    });
}

function updateEmployee(userName, updatedData) {
    log.info('persistence.updateEmployee');
    return new Promise(function (resolve, reject) {
        try {
            var employee = db.getEmployeeByUserName(userName);
            employee.merge(updatedData);
            resolve(employee);
        } catch (e) {
            reject(e);
        }
    });
}

function deleteEmployee(userName) {
    log.info('persistence.getAllEmployees');
    return new Promise(function (resolve, reject) {
        try {
            db.deleteEmployee(userName);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function connectDB() {
    log.info('employeePersistence.connectDB');
    var configuredDB = config.persistence.database || defaultDB;
    switch (configuredDB) {
        case 'fakeDB':
            db = require('./fakeDBConnection');
            break;
        default:
            throw new Error('configured db "' + configuredDB + '" is not implemented yet');
    }
}

connectDB();
exports.getAllEmployees = getAllEmployees;
exports.getEmployeesByUserName = getEmployeesByUserName;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
