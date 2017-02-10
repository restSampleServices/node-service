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
    
    describe('JOb',
        function () {
            it('initialization and getter for address works', function () {
                var testData = new Address();
                var job = new Job({address: testData});
                assert.isString(job.address);
                assert.equal(job.address, testData);
            });
        
            it('setter and getter for country works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.country);
                assert.notEqual(job.country, testData);
                job.country= testData;
                assert.equal(job.country, testData);
            });

            it('initialization and getter for city works', function () {
                var testData = 'simple test value';
                var job = new Job({city: testData});
                assert.isString(job.city);
                assert.equal(job.city, testData);
            });
        
            it('setter and getter for city works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.city);
                assert.notEqual(job.city, testData);
                job.city= testData;
                assert.equal(job.city, testData);
            });
        
            it('initialization and getter for zipcode works', function () {
                var testData = '12345';
                var job = new Job({zipcode: testData});
                assert.isString(job.zipcode);
                assert.equal(job.zipcode, testData);
            });
        
            it('setter and getter for zipcode works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.zipcode);
                assert.notEqual(job.zipcode, testData);
                job.zipcode = testData;
                assert.equal(job.zipcode, testData);
            });

            it('initialization and getter for street works', function () {
                var testData = 'simple test value';
                var job = new Job({street: testData});
                assert.isString(job.street);
                assert.equal(job.street, testData);
            });
        
            it('setter and getter for street works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.street);
                assert.notEqual(job.street, testData);
                job.street = testData;
                assert.equal(job.street, testData);
            });
        
            it('initialization and getter for street2 works', function () {
                var testData = 'simple test value';
                var job = new Job({street2: testData});
                assert.isString(job.street2);
                assert.equal(job.street2, testData);
            });
        
            it('setter and getter for street2 works', function () {
                var testData = 'simple test value';
                var job = new Job();
                assert.isString(job.street2);
                assert.notEqual(job.street2, testData);
                job.street2 = testData;
                assert.equal(job.street2, testData);
            });
        
            it('initialization and getter for geo works', function () {
                var testData = {latitude: '1234', longitude: '9876'};
                var job = new Job({geo: testData});
                assert.isObject(job.geo);
                assert.equal(job.geo.latitude, testData.latitude);
                assert.equal(job.geo.longitude, testData.longitude);
            });
        
            it('setter and getter for geo works', function () {
                var testData = {latitude: '1234', longitude: '9876'};
                var job = new Job();
                assert.isObject(job.geo);
                assert.isString(job.geo.latitude);
                assert.isString(job.geo.longitude);

                assert.notEqual(job.geo.latitude, testData.latitude);
                assert.notEqual(job.geo.longitude, testData.longitude);

                job.geo = testData;

                assert.equal(job.geo.latitude, testData.latitude);
                assert.equal(job.geo.longitude, testData.longitude);
            });

        });
});
