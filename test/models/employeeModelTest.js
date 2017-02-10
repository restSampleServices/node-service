'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains


describe('Models', function () {

    var Address, Employee;
    before(function () {
        Address = require('../../src/models/address');
        Employee = require('../../src/models/employee');
        assert.isDefined(Address, 'dependency could not be loaded');
        assert.isDefined(Employee, 'testclass could not be loaded');

    });

    describe('Employee',
        function () {
            it('initialization and getter for address works', function () {
                var testData = new Address();
                var employee = new Employee({
                    address: testData
                });
                assert.isObject(employee.address);
                assert.equal(employee.address, testData);
            });

            it('setter and getter for address works', function () {
                var testData = new Address();
                var employee = new Employee();
                assert.isUndefined(employee.address);
                assert.notEqual(employee.address, testData);
                employee.address = testData;
                assert.equal(employee.address, testData);
            });

            it('setter and getter for address works', function () {
                var employee = new Employee();
                assert.throws(function () {
                    employee.address = new Date();
                });
            });

            it('initialization and getter for firstName works', function () {
                var testData = 'max';
                var employee = new Employee({
                    firstName: testData
                });
                assert.isString(employee.firstName);
                assert.equal(employee.firstName, testData);
            });

            it('setter and getter for firstName works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.firstName);
                assert.notEqual(employee.firstName, testData);
                employee.firstName = testData;
                assert.equal(employee.firstName, testData);
                employee.firstName = undefined;
                assert.equal(employee.firstName, '');
            });

            it('initialization and getter for lastName works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    lastName: testData
                });
                assert.isString(employee.lastName);
                assert.equal(employee.lastName, testData);
            });

            it('setter and getter for lastName works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.lastName);
                assert.notEqual(employee.lastName, testData);
                employee.lastName = testData;
                assert.equal(employee.lastName, testData);
                employee.lastName = undefined;
                assert.equal(employee.lastName, '');
            });

            it('initialization and getter for dateOfBirth works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    dateOfBirth: testData
                });
                assert.isString(employee.dateOfBirth);
                assert.equal(employee.dateOfBirth, testData);
            });

            it('setter and getter for dateOfBirth works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isUndefined(employee.dateOfBirth);
                assert.notEqual(employee.dateOfBirth, testData);
                employee.dateOfBirth = testData;
                assert.equal(employee.dateOfBirth, testData);
                employee.dateOfBirth = undefined;
                assert.equal(employee.dateOfBirth, undefined);
            });

            it('initialization and getter for email works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    email: testData
                });
                assert.isString(employee.email);
                assert.equal(employee.email, testData);
            });

            it('setter and getter for email works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.email);
                assert.notEqual(employee.email, testData);
                employee.email = testData;
                assert.equal(employee.email, testData);
                employee.email = undefined;
                assert.equal(employee.email, '');
            });

            it('initialization and getter for phone works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    phone: testData
                });
                assert.isString(employee.phone);
                assert.equal(employee.phone, testData);
            });

            it('setter and getter for phone works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.phone);
                assert.notEqual(employee.phone, testData);
                employee.phone = testData;
                assert.equal(employee.phone, testData);
            });

            it('initialization and getter for userName works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    userName: testData
                });
                assert.isString(employee.userName);
                assert.equal(employee.userName, testData);
            });

            it('setter and getter for userName works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.userName);
                assert.notEqual(employee.userName, testData);
                employee.userName = testData;
                assert.equal(employee.userName, testData);
            });

            it('initialization and getter for imageUrl works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    imageUrl: testData
                });
                assert.isString(employee.imageUrl);
                assert.equal(employee.imageUrl, testData);
            });

            it('setter and getter for imageUrl works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isUndefined(employee.imageUrl);
                assert.notEqual(employee.imageUrl, testData);
                employee.imageUrl = testData;
                assert.equal(employee.imageUrl, testData);
            });

            it('initialization and getter for department works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    department: testData
                });
                assert.isString(employee.department);
                assert.equal(employee.department, testData);
            });

            it('setter and getter for department works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.department);
                assert.notEqual(employee.department, testData);
                employee.department = testData;
                assert.equal(employee.department, testData);
            });

            it('initialization and getter for jobTitle works', function () {
                var testData = 'simple test value';
                var employee = new Employee({
                    jobTitle: testData
                });
                assert.isString(employee.jobTitle);
                assert.equal(employee.jobTitle, testData);
            });

            it('setter and getter for jobTitle works', function () {
                var testData = 'simple test value';
                var employee = new Employee();
                assert.isString(employee.jobTitle);
                assert.notEqual(employee.jobTitle, testData);
                employee.jobTitle = testData;
                assert.equal(employee.jobTitle, testData);
            });

            it('initialization and getter for jobHistory works', function () {
                var employee = new Employee();
                assert.isArray(employee.jobHistory);
                assert.equal(employee.jobHistory.length, 0);
            });

            it('setter for jobHistory is forbidden', function () {
                var employee = new Employee();
                assert.throws(function () {
                    employee.jobHistory = [];
                });
            });


        });
});
