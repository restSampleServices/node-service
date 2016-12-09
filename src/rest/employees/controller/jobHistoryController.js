'use strict';
/*
 * Controller to handle all Job related calls
 */

// ** global includes
var log = require('nodelog')();
var errorHandler = require('../../errorHandler.js');

log.info('loading jobHistoryController');

// ** rest service includes
var endpoints = require('./../endpoints.js');

// ** connection to persistence and database
var employeeDB = require('./../../../persistence/employeePersistence.js');


function validateUserNameParam(req) {
    var userName = req.params.userName;
    if (userName === undefined) {
        throw new Error('missing parameter userName');
    }
    return {
        userName: userName,
    };
}

function validateJobRequestParams(req) {
    var userName = validateUserNameParam(req).userName;

    var jobId = req.params.jobId;
    if (jobId === undefined) {
        throw new Error('missing parameter jobId');
    }
    return {
        userName: userName,
        jobId: jobId
    };
}

function validateJobPostPutPayload(req) {
    var json = req.body;
    if (json === undefined) {
        throw new Error('missing payload for create job');
    }
    return json;
}

function getAllJobs(req, res) {
    try {
        log.info('jobHistoryController.getAllJobs');
        var userName = validateUserNameParam(req).userName;
        employeeDB.getEmployeeByUserName(userName).then(function (employee) {
            res.json(employee.jobHistory);
        }).catch(function (dbError) {
            log.error('database error in jobHistoryController.getAllJobs', dbError);
            errorHandler.DataNotFound(dbError, res);
        });
    } catch (err) {
        log.error('error in jobHistoryController.getAllJobs', err);
        errorHandler.DataNotFound(err, res);
    }
}

function getJobById(req, res) {
    try {
        log.info('jobHistoryController.getJobById');
        var p = validateJobRequestParams(req);

        employeeDB.getJobByUserNameAndId(p.userName, p.jobId)
            .then(function (job) {
                res.json(job);
            })
            .catch(function (dbError) {
                log.error('database error in jobHistoryController.getJobById', dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in jobHistoryController.getJobById');
        errorHandler.DataNotFound(err, res);
    }
}

function createJob(req, res) {
    try {
        log.info('jobHistoryController.createJob');

        //TODO: add authorization
        var userName = validateUserNameParam(req).userName;
        var json = validateJobPostPutPayload(req);

        employeeDB.createJob(userName, json)
            .then(function (job) {
                res.json(job);
            })
            .catch(function (dbError) {
                log.error(dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in jobHistoryController.createJob');
        errorHandler.DataNotFound(err, res);
    }
}

function updateJob(req, res) {
    try {
        //TODO: add authorization
        log.info('jobHistoryController.updateJob');

        var p = validateJobRequestParams(req);
        var json = validateJobPostPutPayload(req);

        employeeDB.updateJob(p.userName, p.jobId, json)
            .then(function (job) {
                res.json(job);
            })
            .catch(function (dbError) {
                log.error(dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in jobHistoryController.updateJob');
        errorHandler.DataNotFound(err, res);
    }
}

function deleteJob(req, res) {
    try {
        log.info('jobHistoryController.deleteJob');
        var p = validateJobRequestParams(req);

        employeeDB.deleteJob(p.userName, p.jobId)
            .then(function () {
                res.end();
            })
            .catch(function (dbError) {
                log.error('database error for jobHistoryController.deleteJob', dbError);
                errorHandler.DataNotFound(dbError, res);
            });
    } catch (err) {
        log.debug('error in jobHistoryController.deleteJob');
        errorHandler.DataNotFound(err, res);
    }
}

function init(app) {
    log.info('initialize jobHistoryController');
    app.route(endpoints.byUserName.jobHistory.all)
        .get(getAllJobs)
        .post(createJob);
    app.route(endpoints.byUserName.jobHistory.byId)
        .get(getJobById)
        .put(updateJob)
        .delete(deleteJob);

}


module.exports = init;
