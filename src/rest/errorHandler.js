'use strict';
var log = require('nodelog')();
log.info('loading generic error handler');

var exports = module.exports = {};

function assertParameter(err, res) {
    if (!err) {
        log.warning('error parameter is not set');
        throw new Error('parameter "error" is missing');
    }
    log.error(err);
    if (!res) {
        log.warning('response parameter is not set');
        throw new Error('parameter "response" is missing');
    }
}


function handleError500(err, res) {
    assertParameter(err, res);

    try {
        log.debug('handleError500', err);
        res.status(500).send('an internal error occurs. sorry! details:' + err.message);
        res.end();
    } catch (error) {
        //dont fail here because it my bring the service down
        log.warning('error in errorHandler.handleError500: ' + error);
    }
}

function handleError404(err, res) {
    try {
        log.debug('handleError404', err);
        assertParameter(err, res);
        var fs = require('fs');
        fs.readFile(__dirname + '/../html/404.html', 'utf8', function(err, html) {
            if (err) {
                log.warning('error while reading 404.html', err);
                res.status(404).send('404 - data not found');
            } else {
                res.status(404).send(html);
            }
            res.end();
            res.statusCode = 404;
        });
    } catch (error) {
        log.warning('error in errorHandler.handleError404: ' + error);
        handleError500(err, res);
    }
}

//TODO Function Doc
exports.InternalServerError = handleError500;
exports.DataNotFound = handleError404;
