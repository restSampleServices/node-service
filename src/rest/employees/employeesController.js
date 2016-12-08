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
        employeeDB.getAllEmployees().then(function (employees) {
            var dto = [];
            //reduce the amount of transported data
            employees.forEach(function (employee) {
                dto.push(new DTOEmployeeCollectionEntry(employee));
            })
            res.json(dto);
        }).catch(function (dbError) {
            log.error('database error in employeeController.getEmployees', dbError);
            errorHandler.InternalServerError(dbError, res);
        });
    } catch (err) {
        log.error('error in employeeController.getEmployees', err);
        errorHandler.InternalServerError(err, res);
    }
}

function getEmployeesByUserName(req, res) {
    try {
        var userName = req.params.userName;
        if (userName === undefined) throw new Error('missing parameter userName');
        log.info('employeeController.getEmployeeByUserName {0}', userName);
        employeeDB.getEmployeesByUserName(userName).then(function (employee) {
            if (employee !== undefined) {
                res.json(employee);
            } else {
                errorHandler.DataNotFound('user not found: ' + userName, res);
            }
        }).catch(function (dbError) {
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

function updateEmployee(req, res) {
    try {
        //TODO: add authorization
        var userName = req.params.userName;
        var json = req.body;
        console.log(req.nody);

        log.important(json);
        if (userName === undefined) {
            throw new Error('missing parameter - userName -');
        }
        log.info('employeeController.updateEmployee {0}', userName);
        employeeDB.getEmployeesByUserName(userName).then(function (employee) {
            if (employee !== undefined) {
                res.json(employee);
            } else {
                errorHandler.DataNotFound('user not found: ' + userName, res);
            }
        }).catch(function (dbError) {
            log.error('database error in employeeController.getEmployeeById', dbError);
            errorHandler.DataNotFound(dbError, res);
        });
    } catch (err) {
        log.debug('error in employeeController.getEmployeeById');
        errorHandler.InternalServerError(err, res);
    }
}

function init(app) {
    log.info('initialize employeeController');
    app.route('/')
        .get(getEmployees)
        .post(createProduct);
    app.route('/:userName')
        .get(getEmployeesByUserName)
        .put(updateEmployee);
}


module.exports = init;
