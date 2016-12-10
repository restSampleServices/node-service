'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

var mockRequire = require('mock-require');


describe('Persistence', function () {

    describe('Employee', function () {

        describe('Public API', function () {

            var employeeDB;
            before(function () {
                //we have to set the timeout because the fake db is generated on require call
                this.timeout(10000);
                employeeDB = require('../../src/persistence/employeePersistence');
            });

            after(function () {});

            it('documented api functions are defined', function () {
                assert.isDefined(employeeDB.getAllEmployees, 'getAllEmployees is not defined');
                assert.isFunction(employeeDB.getEmployeeByUserName, 'getEmployeeByUserName is not defined');
                assert.isDefined(employeeDB.createEmployee, 'createEmployee is not defined');
                assert.isFunction(employeeDB.updateEmployee, 'updateEmployee is not defined');
                assert.isDefined(employeeDB.deleteEmployee, 'deleteEmployee is not defined');
                assert.isFunction(employeeDB.getJobByUserNameAndId, 'getJobByUserNameAndId is not defined');
                assert.isDefined(employeeDB.createJob, 'createJob is not defined');
                assert.isFunction(employeeDB.updateJob, 'updateJob is not defined');
                assert.isDefined(employeeDB.deleteJob, 'deleteJob is not defined');
            });


            it('getAllEmployees is async', function () {
                assert.instanceOf(employeeDB.getAllEmployees(), Promise);
            });

            it('getEmployeeByUserName is async', function () {
                assert.instanceOf(employeeDB.getEmployeeByUserName(), Promise);
            });

            it('createEmployee is async', function () {
                assert.instanceOf(employeeDB.createEmployee(), Promise);
            });

            it('updateEmployee is async', function () {
                assert.instanceOf(employeeDB.updateEmployee(), Promise);
            });

            it('deleteEmployee is async', function () {
                assert.instanceOf(employeeDB.deleteEmployee(), Promise);
            });

            it('getJobByUserNameAndId is async', function () {
                assert.instanceOf(employeeDB.getJobByUserNameAndId(), Promise);
            });

            it('createJob is async', function () {
                assert.instanceOf(employeeDB.createJob(), Promise);
            });

            it('updateJob is async', function () {
                assert.instanceOf(employeeDB.updateJob(), Promise);
            });

            it('deleteJob is async', function () {
                assert.instanceOf(employeeDB.deleteJob(), Promise);
            });
        });

        xdescribe('development db', function () {

            // mock the configuration to use dev db
            var productDB, product;
            before(function () {

                mockRequire('../../src/config.json', {
                    "productName": "Version Service",
                    "technicalProductName": "versionService",
                    "persistence": {
                        "database": "mock",
                        "dynamodb": {
                            "config": "no supported yet"
                        }
                    }
                });

                productDB = require('../../src/persistence/productPersistence.js');
                product = require('../../src/models/product.js');

                //var appToTest = require('../src/service.js');
            });

            after(function () {
                mockRequire.stop('../../src/config.json');
            });

            it('devdb.getAllProducts is async', function () {
                assert.instanceOf(productDB.getAllProducts(), Promise);
            });

            it('devdb.getAllProducts delivers correct model', function (done) {
                productDB.getAllProducts().then(function (products) {
                    assert.isArray(products);
                    //TODO: Check all Model of Array Members here
                    assert.instanceOf(products[0], product, 'first element of products is not a product');
                    done();
                }).catch(function (err) {
                    assert.fail(err);
                    done();
                });
            });
        });

        xdescribe('dynamodb', function () {
            var productDB, product;
            // mock the configuration to use dynamo db db

            before(function () {

                mockRequire('../../src/config.json', {
                    "productName": "Version Service",
                    "technicalProductName": "versionService",
                    "persistence": {
                        "database": "DynamoDB",
                        "dynamodb": {
                            "config": "no supported yet"
                        }
                    }
                });

                productDB = require('../../src/persistence/productPersistence.js');
                product = require('../../src/models/product.js');

                //var appToTest = require('../src/service.js');
            });

            after(function () {
                mockRequire.stop('../../src/config.json');
            });

            it('dynamodb.getAllProducts is async', function () {
                assert.instanceOf(productDB.getAllProducts(), Promise);
            });

            xit('dynamodb.getAllProducts delivers correct model', function (done) {
                productDB.getAllProducts().then(function (products) {
                    assert.isArray(products);
                    //TODO: Check the Model of Array Members here

                    done();
                }).catch(function (err) {
                    assert.fail(err);
                    done();
                });
            });
        });
    });
});
