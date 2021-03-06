'use strict';
/*
 * Controller to handle all Employees related calls
 */

// ** global includes
var log = require('nodelog')();
var errorHandler = require('../../errorHandler.js');

log.info('loading employeesController');

// ** rest service includes
var endpoints = require('./../endpoints.js');

// ** connection to persistence and database
var employeeDB = require('./../../../persistence/employeePersistence.js');

// ** transport related models
var DTOEmployeeCollectionEntry = require('./../dto/employeeCollectionEntry');

//send all employees as dto employee colletion entry to caller
function getEmployees(req, res) {
    try {
        log.info('employeeController.getEmployees');
        employeeDB.getAllEmployees().then(function (employees) {
            var dto = [];
            //reduce the amount of transported data
            employees.forEach(function (employee) {
                dto.push(new DTOEmployeeCollectionEntry(employee));
            });
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

function getEmployeeByUserName(req, res) {
    try {
        var userName = req.params.userName;
        if (userName === undefined) {
            throw new Error('missing parameter userName');
        }
        log.info('employeeController.getEmployeeByUserName %s', userName);
        employeeDB.getEmployeeByUserName(userName)
            .then(function (employee) {
                if (employee !== undefined) {
                    res.json(employee);
                } else {
                    errorHandler.DataNotFound('user not found: ' + userName, res);
                }
            })
            .catch(function (dbError) {
                log.error('database error in employeeController.getEmployeeByUserName', dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in employeeController.getEmployeeByUserName');
        errorHandler.InternalServerError(err, res);
    }
}

//reads the avatar url from backend and redrirect the request
function getAvatar(req, res) {
    try {
        //TODO: add authorization
        var userName = req.params.userName;
        if (userName === undefined) {
            throw new Error('missing parameter - userName -');
        }
        log.info('employeeController.getAvatar %s', userName);
        employeeDB.getEmployeeByUserName(userName).then(function (employee) {
            if (employee !== undefined) {
                res.redirect(employee.imageUrl);
            } else {
                errorHandler.DataNotFound('user not found: ' + userName, res);
            }
        }).catch(function (dbError) {
            log.error('database error in employeeController.getAvatar', dbError);
            errorHandler.DataNotFound(dbError, res);
        });
    } catch (err) {
        log.debug('error in employeeController.getAvatar');
        errorHandler.InternalServerError(err, res);
    }
}

function updateEmployee(req, res) {
    try {
        //TODO: add authorization
        var userName = req.params.userName;
        var updatedEmployee = req.body;
        log.info('employeeController.updateEmployee %s', userName);

        if (userName === undefined || updatedEmployee === undefined) {
            throw new Error('missing parameter - userName - or the payload');
        }
        employeeDB.updateEmployee(userName, updatedEmployee)
            .then(function (employee) {
                res.json(employee);
            })
            .catch(function (dbError) {
                log.error(dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in employeeController.updateEmployee');
        errorHandler.InternalServerError(err, res);
    }
}

function deleteEmployee(req, res) {
    try {
        var userName = req.params.userName;
        if (userName === undefined) {
            throw new Error('missing parameter userName');
        }
        log.info('employeeController.deleteEmployee %s', userName);
        employeeDB.deleteEmployee(userName)
            .then(function () {
                res.end();
            })
            .catch(function (dbError) {
                log.error('database error in employeeController.getEmployeeByUserName', dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in employeeController.getEmployeeByUserName');
        errorHandler.InternalServerError(err, res);
    }
}

function createEmployee(req, res) {
    res.status(404).send('comming soon');
}

function init(app) {
    log.info('initialize employeeController');
    app.route(endpoints.getAll)
        .get(getEmployees)
        .post(createEmployee);
    app.route(endpoints.byUserName.root)
        .get(getEmployeeByUserName)
        .put(updateEmployee)
        .delete(deleteEmployee);
    app.route(endpoints.byUserName.avatar)
        .get(getAvatar);
}


module.exports = init;
