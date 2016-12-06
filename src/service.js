'use strict';

//core logging settings
var log = require('nodelog')({
    logLevel: 'warning'
});

var config = require('./config.json');
var express = require('express');
var app = express();

var employeesController = require('./rest/employeesController.js');

app.get('/', function (req, res) {
    var endpoints = require('./rest/endpoints.js');

    //TODO: return a better support page than than endpoints definition
    res.json(endpoints);
});


function startService(port) {
    log.info('loading controllers...');
    employeesController(app);
    log.info('starting rest service...');
    var server = app.listen(port, function () {

        var host = server.address().address;
        var port = server.address().port;

        log.important('Server is runnning at http://%s:%s', host, port);
    });
}
startService(config.server.port);
/*
configuration.load().then(function (config) {
    startService(config.server.port);
}, function (err) {
    log.error(err);
});
*/
/*
log.info('starting rest service...');
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    log.important('Server is runnning at http://%s:%s', host, port);
});
log.important('end of file');
*/
