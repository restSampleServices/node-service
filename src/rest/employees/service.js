'use strict'
var log = require('nodelog')();
log.info('loading employee service');

var employeesController = require('./employeesController.js');

function init(app) {
    log.info('initialize employee service');
    employeesController(app);
}


module.exports = init;
