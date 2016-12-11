'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains
var mockRequire = require('mock-require');

var Employee = require('../../src/models/employee');
var Job = require('../../src/models/job');

describe('Persistence', function () {

    var dbConn;

    var testEmployeeCount = 10;
    var testUserName = 'testuser';

    var testEmployee = {
        userName: 'unit test',
        address: {
            city: 'Berlin'
        }
    };

    before(function () {
        //this.timeout(10000);
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
        dbConn = require('../../src/persistence/fakeDBConnection');
    });

    describe('fakeDB Connection',
        function () {
            it('should deliver a list of employees on getAllEmployees', function () {
                assert.isFunction(dbConn.getAllEmployees);
                var data = dbConn.getAllEmployees();
                assert.isArray(data);
                for (let d of data) {
                    assert.instanceOf(d, Employee, 'one entry is not an instance of employee');
                }
                assert.equal(data.length, testEmployeeCount);
            });

            it('should deliver a employee with getEmployeeByUserName', function () {
                assert.isFunction(dbConn.getEmployeeByUserName);
                var data = dbConn.getEmployeeByUserName(testUserName);
                assert.isDefined(data);
                assert.instanceOf(data, Employee, 'returned data is not an instance of Employee');
                assert.equal(data.userName, testUserName, 'serach was not based on username');
            });

            it('should throw error when we call getEmployeeByUserName for not existing user', function () {
                assert.throws(function () {
                    dbConn.getEmployeeByUserName(testUserName + 'ABC');
                }, Error, 'not found', 'query an invalid user does not throw an exception');
            });

            it('should not throw error when we call getEmployeeByUserName for not existing user', function () {
                var data = dbConn.getEmployeeByUserName(testUserName + 'ABC', true);
                assert.isUndefined(data);
            });

            it('should deliver a job with getJobByUserNameAndId', function () {
                var e = dbConn.getEmployeeByUserName(testUserName);
                if (e.jobHistory.length <= 2) this.skip();
                //console.log(JSON.stringify(e.jobHistory));

                assert.isFunction(dbConn.getJobByUserNameAndId);
                var data = dbConn.getJobByUserNameAndId(testUserName, 2);
                assert.isDefined(data);
                assert.instanceOf(data, Job, 'returned data is not an instance of job');
                assert.equal(data.id, 2, 'search was not based on job id');
            });

            it('should throw error when we call getEmployeeByUserName for not existing user', function () {
                assert.throws(function () {
                    dbConn.getJobByUserNameAndId(testUserName + 'ABC', 1);
                }, Error, 'not found', 'query an invalid user id does not throw an exception');
                assert.throws(function () {
                    dbConn.getJobByUserNameAndId(testUserName, 'ABC');
                }, Error, 'no job', 'query an invalid job id does not throw an exception');
            });

            it('should create a employee with createEmployee', function () {
                assert.isFunction(dbConn.createEmployee);
                var e = new Employee(testEmployee);
                dbConn.createEmployee(e);
                var data = dbConn.getEmployeeByUserName(testEmployee.userName);
                assert.equal(data.userName, e.userName, 'userName was not saved');
                assert.equal(data.address.city, e.address.city, 'address.city was not saved');
            });

            it('should throw when call createEmployee with a simple json', function () {
                assert.throws(function () {
                    dbConn.createEmployee(testEmployee);
                }, Error, 'expected Employee', 'query an invalid user id does not throw an exception');
            });

            xit('should delete a employee when call delete', function () {
                var e;
                e = dbConn.getEmployeeByUserName(testEmployee.userName, true);
                if (!e) {
                    e = new Employee(testEmployee);
                    dbConn.createEmployee(e);
                }
                var data = dbConn.getEmployeeByUserName(testEmployee.userName);
                assert.equal(data.userName, e.userName, 'userName was not saved');
                dbConn.deleteEmployee(e.testUserName);
                var data2 = dbConn.getEmployeeByUserName(testEmployee.userName, true);
                assert.isUndefined(data2, 'employee was not deleted');
            });

            it('should not throw error when delete a non existing employee', function () {
                var dl = dbConn.getAllEmployees().length;
                dbConn.deleteEmployee(Date.now.toString());
                assert.equal(dl, dbConn.getAllEmployees().length, 'there is a difference in the count of elements');
            });

        });
});
