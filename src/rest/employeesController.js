'use strict';
var log = require('nodelog')();
var endpoints = require('./endpoints.js');
var errorHandler = require('../errorHandler.js');

var employeeDB = require('./../persistence/employeePersistence.js');

function getEmployees(req, res) {
    try {
        log.info('employeeController.getemployee ');
        employeeDB.getAllEmployees().then(function (employees) {
            log.debug(JSON.stringify(employees, null, 2));
            res.json(employees);
        }).catch(function (dbError) {
            errorHandler.InternalServerError(dbError, res);
        });

    } catch (err) {
        log.debug('error in employeeController.getemployee');
        errorHandler.InternalServerError(err, res);
    }
}

function getEmployeeById(req, res) {
    try {
        log.info('employeeController.getemployee ');
        employeeDB.getAllEmployees().then(function (employees) {
            log.verbose(employees);
            res.json(employees);
        }).catch(function (dbError) {
            errorHandler.DataNotFound(dbError, res);
        });

    } catch (err) {
        log.debug('error in employeeController.getemployee');
        errorHandler.InternalServerError(err, res);
    }
}

function createProduct(req, res) {
    res.status(404).send('comming soon');
}

function updateProduct(req, res) {
    res.status(404).send('comming soon');
}

function init(app) {
    log.info('initialize employeeController');
    app.route(endpoints.employees.root)
        .get(getEmployees)
        .post(createProduct)
        .put(updateProduct);
}


module.exports = init;
