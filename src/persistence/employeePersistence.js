'use strict';
var exports = module.exports = {};

var log = require('nodelog')();
var config = require('../config.json');
var Product = require('../models/product');
var Build = require('../models/build');
var Artefact = require('../models/artefact');


var defaultDB = 'DynamoDB';
log.debug('initialize productPersistence module');


function getAllProductsMock() {
    //curenntly delivering mock data, database connection will follow
    log.info('persistence.getAllProductsMock');
    var prod1 = new Product('test', [new Build('build 1'), new Build('build 2')]);
    prod1.builds[0].addArtefact(new Artefact('samle.exe', 'sha123', 'http:/xyz', 'just a mock sample'));

    var prod2 = new Product('test2', [new Build('build 1'), new Build('build 2')]);

    return [prod1, prod2];
}


function getAllProductsSwitcher() {
    log.info('persistence.getAllProducts');
    return new Promise(function (resolve, reject) {
        var db = config.persistence.database || defaultDB;
        switch (db) {
            case 'mock':
                return resolve(getAllProductsMock());
            default:
                return reject(Error('not implemented yet'));
        }
    });
}

exports.getAllProducts = getAllProductsSwitcher;
