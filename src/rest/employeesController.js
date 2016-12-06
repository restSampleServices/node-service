'use strict';
var log = require('nodelog')();
var endpoints = require('./endpoints.js');
var errorHandler = require('../errorHandler.js');

var employeeDB = require('./../persistence/employeePersistence.js');

function getEmployees(req, res) {
    try {
        log.info('productsController.getProducts ');
        employeeDB.getAllEmployees().then(function (employees) {
            var response = employees;
            console.log(response);
            res.json(response);
        }).catch(function (dbError) {
            errorHandler.DataNotFound(dbError, res);
        });

    } catch (err) {
        log.debug('error in productsController.getProducts');
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
    log.info('initialize productsController');
    app.route(endpoints.employees.root)
        .get(getEmployees)
        .post(createProduct)
        .put(updateProduct);
}


module.exports = init;
