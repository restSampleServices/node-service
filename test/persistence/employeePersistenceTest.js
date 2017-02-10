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

        describe('CRUD', function () {

            // mock the configuration to use small fakedb
            var employeeDB;
            var testEmployeeCount = 10;
            before(function () {
                this.timeout(10000);
                delete require.cache[require.resolve('../../src/config.json')]
                mockRequire('../../src/config.json', {
                    "services": {
                        "employees": {
                            "enabled": true,
                            "endpoints": ["/employees", "/mitarbeiter"],
                            "persistence": {
                                "database": "fakeDB",
                                "fakeDB": {
                                    "employeeCount": testEmployeeCount,
                                    "locale": "en"
                                },
                                "dynamodb": {
                                    "config": "no supported yet"
                                }
                            }
                        }

                    }
                });

                //to reduce the amount of users
                var dbConn = require('../../src/persistence/fakeDBConnection');
                dbConn.resetData(testEmployeeCount);
                //the object for the deinfed tests:
                employeeDB = require('../../src/persistence/employeePersistence');
            });

            after(function () {
                mockRequire.stop('../../src/config.json');
                delete require.cache[require.resolve('../../src/config.json')]
            });

            it('getAllEmployees delivers list of Employee', function (done) {
                //ISSUE: fakeDB already created??
                this.timeout(10000);

                employeeDB.getAllEmployees().then(function (emps) {
                    assert.isArray(emps);
                    assert.equal(emps.length, testEmployeeCount, 'a different amaount of entries are created');
                    done();
                }).catch(function (err) {
                    assert.fail(err);
                    done();
                });
            });
        });

    });
});
