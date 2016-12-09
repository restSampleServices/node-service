'use strict'
var log = require('nodelog')();
log.info('loading employee service');

var employeesController = require('./controller/employeesController');
var jobHistoryController = require('./controller/jobHistoryController');

function init(app) {
    log.info('initialize employee service');
    employeesController(app);
    jobHistoryController(app);
}


module.exports = init;
