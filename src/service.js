'use strict';

//core logging settings
var log = require('nodelog')({
    level: 'info'
});

var config = require('./config.json');

// ** Initialize Application ** //
var express = require('express');
var app = express();

// ** Initialize root enpoints ** //
app.get('/help', function (req, res) {
    //TODO: return a better support page than than endpoints definition
    //TODO: move to separate file
    res.send('available services: <br/>/employees/');
    res.end();
});

// ** Initialize Services ** //
log.info('loading services...');

if (config.services.employees.enabled) {
    //employees service / endpoints
    var employeeService = require('./rest/employees/service.js');
    var employeeApp = express();
    employeeService(employeeApp);
    app.use(config.services.employees.endpoints, employeeApp);
}


// ** Start Application Server ** //
function startService(port) {

    log.info('starting rest service...');
    app.use(express.static(__dirname + '/html'));
    app.use(function (err, req, res, next) {
        log.error(err.stack);
        res.status(500).send('Oops, that should not happen... Error 500!');
        next();
    });
    var server = app.listen(port, function () {

        var host = server.address().address;
        var port = server.address().port;

        log.important('Server is runnning at http://%s:%s', host, port);
    });
}
startService(config.server.port);
