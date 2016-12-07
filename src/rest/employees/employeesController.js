'use strict';
/*
 * Controller to handle all Employees related calls
 */

// ** global includes
var log = require('nodelog')();
var errorHandler = require('../errorHandler.js');

var endpoints = require('./endpoints.js');

// ** connection to persistence and database
var employeeDB = require('./../../persistence/employeePersistence.js');

// ** transport related models
var DTOEmployeeCollectionEntry = require('./dto/employeeCollectionEntry');

//send all employees as dto employee colletion entry to caller
function getEmployees(req, res) {
    try {
        log.info('employeeController.getEmployees');
        employeeDB.getAllEmployees().then(function(employees) {
            var dto = [];
            //reduce the amount of transported data
            employees.forEach(function(employee) {
                dto.push(new DTOEmployeeCollectionEntry(employee));
            })
            res.json(dto);
        }).catch(function(dbError) {
            log.error('database error in employeeController.getEmployees', dbError);
            errorHandler.InternalServerError(dbError, res);
        });
    } catch (err) {
        log.error('error in employeeController.getEmployees', err);
        errorHandler.InternalServerError(err, res);
    }
}

function getEmployeeById(req, res) {
    try {
        log.info('employeeController.getEmployeeById ');
        employeeDB.getEmployeesByUserName('param').then(function(employee) {
            res.json(employee);
        }).catch(function(dbError) {
            log.error('database error in employeeController.getEmployeeById', dbError);
            errorHandler.DataNotFound(dbError, res);
        });
    } catch (err) {
        log.debug('error in employeeController.getEmployeeById');
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
    app.route('/')
        .get(getEmployees)
        .post(createProduct)
        .put(updateProduct);
}


module.exports = init;
