'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains


describe('Models', function () {

    var Address, Job;
    before(function () {
        Address = require('../../src/models/address');
        Job = require('../../src/models/job');
        assert.isDefined(Address, 'dependency could not be loaded');
        assert.isDefined(Job, 'testclass could not be loaded');

    });
    
    describe('Job',
        function () {
            it('initialization and getter for address works', function () {
                var testData = new Address();
                var job = new Job({address: testData});
                assert.isObject(job.address);
                assert.equal(job.address, testData);
            });
        
            it('setter and getter for address works', function () {
                var testData = new Address();
                var job = new Job();
                assert.isUndefined(job.address);
                assert.notEqual(job.address, testData);
                job.address= testData;
                assert.equal(job.address, testData);
            });

            it('setter and getter for address works', function () {
                var job = new Job();
                assert.throws(function(){
                  job.address = new Date();
                });
            });
    
            it('initialization and getter for id works', function () {
                var testData = '1337';
                var job = new Job({id: testData});
                assert.isString(job.id);
                assert.equal(job.id, testData);
            });
        
            it('setter for id is forbidden', function () {
                var testData = '1337';
                var job = new Job();
                assert.isString(job.id);
                assert.notEqual(job.id, testData);
                assert.throws(function(){
                  job.id = testData;
                });
            });
        
            it('initialization and getter for companyName works', function () {
                var testData = '12345';
                var job = new Job({companyName: testData});
                assert.isString(job.companyName);
                assert.equal(job.companyName, testData);
            });
        
            it('setter and getter for companyName works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.companyName);
                assert.notEqual(job.companyName, testData);
                job.companyName = testData;
                assert.equal(job.companyName, testData);
                job.companyName= undefined;
                assert.equal(job.companyName, '');
            });

            it('initialization and getter for department works', function () {
                var testData = 'simple test value';
                var job = new Job({department: testData});
                assert.isString(job.department);
                assert.equal(job.department, testData);
            });
        
            it('setter and getter for department works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.department);
                assert.notEqual(job.department, testData);
                job.department = testData;
                assert.equal(job.department, testData);
                job.department = undefined;
                assert.equal(job.department, '');
            });
        
            it('initialization and getter for dateStart works', function () {
                var testData = 'simple test value';
                var job = new Job({dateStart: testData});
                assert.isString(job.dateStart);
                assert.equal(job.dateStart, testData);
            });
        
            it('setter and getter for dateStart works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.dateStart);
                assert.notEqual(job.dateStart, testData);
                job.dateStart = testData;
                assert.equal(job.dateStart, testData);
                job.dateStart = undefined;
                assert.equal(job.dateStart, '');
            });
        
            it('initialization and getter for dateEnd works', function () {
                var testData = 'simple test value';
                var job = new Job({dateEnd: testData});
                assert.isString(job.dateEnd);
                assert.equal(job.dateEnd, testData);
            });
        
            it('setter and getter for dateEnd works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.dateEnd);
                assert.notEqual(job.dateEnd, testData);
                job.dateEnd = testData;
                assert.equal(job.dateEnd, testData);
            });

        });
});
