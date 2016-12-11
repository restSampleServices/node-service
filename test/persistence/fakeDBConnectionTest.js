'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains
var mockRequire = require('mock-require');

var Employee = require('../../src/models/employee');


describe('Persistence', function () {

    var testEmployeeCount = 10;
    var testUser = 'testuser';
    var dbConn;


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
                var data = dbConn.getEmployeeByUserName(testUser);
                assert.isDefined(data);
                assert.instanceOf(data, Employee, 'returned data is not an instance of Employee');
                assert.equal(data.userName, testUser, 'serach was not based on username');
            });

            it('should throw error when we call getEmployeeByUserName for not existing user', function () {
                assert.throws(function () {
                    dbConn.getEmployeeByUserName(testUser + 'ABC');
                }, Error, 'not found', 'query an invalid user does not throw an exception');
            });

            it('should not throw error when we call getEmployeeByUserName for not existing user', function () {
                var data = dbConn.getEmployeeByUserName(testUser + 'ABC', true);
                assert.isUndefined(data);
            });
        });
});
