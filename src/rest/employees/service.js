'use strict'
var log = require('nodelog')();
log.info('loading employee service');

var allEmployeesController = require('./allEmployeesController.js');

function init(app) {
    log.info('initialize employee service');
    allEmployeesController(app);
}


module.exports = init;
