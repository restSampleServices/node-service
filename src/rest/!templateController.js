'use strict';
var log = require('nodelog')();
var endpoints = require('./endpoints.js');
var errorHandler = require('./errorHandler.js');
var templateDB = require('./../persistence/templatePersistence.js');

function getData(req, res) {
    try {
        log.info('templateController.getData ');
        res.json(templateDB.getAllData());
    } catch (err) {
        errorHandler.handleInternalServerError(err, res);
    }
}

function createData(req, res) {
    res.status(404).send('comming soon');
}

function updateData(req, res) {
    res.status(404).send('comming soon');
}

function init(app) {
    log.info('initialize templateController');
    app.route(endpoints.template.root)
        .get(getData)
        .post(createData)
        .put(updateData);
}


module.exports = init;
