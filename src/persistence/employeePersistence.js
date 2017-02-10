'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json').services.employees;

log.info('loading employeePersistence module');

var Employee = require('../models/employee');
var Job = require('../models/job');
var db; // = require('./fakeDB'); = require('./couchDB');

var defaultDB = 'fakeDB';

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

function getEmployeeByUserName(userName) {
    log.info('persistence.getEmployeeByUserName');
    return new Promise(function (resolve, reject) {
        try {
            var employee = db.getEmployeeByUserName(userName);
            resolve(employee);
        } catch (e) {
            reject(e);
        }
    });
}

function createEmployee(json) {
    log.info('persistence.createEmployee');
    return new Promise(function (resolve, reject) {
        try {
            var e = new Employee(json);
            db.createEmployee(e);
            resolve(e);
        } catch (error) {
            reject(error);
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
    log.info('persistence.deleteEmployee');
    return new Promise(function (resolve, reject) {
        try {
            db.deleteEmployee(userName);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function getJobByUserNameAndId(userName, jobId) {
    log.info('persistence.getJobByUserNameAndId');
    return new Promise(function (resolve, reject) {
        try {
            var job = db.getJobByUserNameAndId(userName, jobId);
            resolve(job);
        } catch (e) {
            reject(e);
        }
    });
}

function createJob(userName, json) {
    log.info('persistence.createJob');
    return new Promise(function (resolve, reject) {
        try {
            var j = new Job(json);
            db.createJob(userName, j);
            resolve(j);
        } catch (e) {
            reject(e);
        }
    });
}

function updateJob(userName, jobId, updatedJob) {
    log.info('persistence.updateJob');
    return new Promise(function (resolve, reject) {
        try {
            var job = db.getJobByUserNameAndId(userName, jobId);
            job.merge(updatedJob);
            resolve(job);
        } catch (e) {
            reject(e);
        }
    });
}

function deleteJob(userName, jobId) {
    log.info('persistence.deleteJob');
    return new Promise(function (resolve, reject) {
        try {
            db.deleteJob(userName, jobId);
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
exports.getEmployeeByUserName = getEmployeeByUserName;
exports.createEmployee = createEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;

exports.getJobByUserNameAndId = getJobByUserNameAndId;
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
