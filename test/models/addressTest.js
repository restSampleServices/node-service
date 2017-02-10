'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains


describe('Models', function () {

    var Address;
    before(function () {
        Address = require('../../src/models/address');
        assert.isDefined(Address, 'testclass could not be loaded');

    });
    
    describe('Address',
        function () {
            it('initialization and getter for country works', function () {
                var testData = 'simple test value';
                var address = new Address({country: testData});
                assert.isString(address.country);
                assert.equal(address.country, testData);
            });
        
            it('setter and getter for country works', function () {
                var testData = 'simple test value';
                var address = new Address();
                assert.isString(address.country);
                assert.notEqual(address.country, testData);
                address.country= testData;
                assert.equal(address.country, testData);
            });

            it('initialization and getter for city works', function () {
                var testData = 'simple test value';
                var address = new Address({city: testData});
                assert.isString(address.city);
                assert.equal(address.city, testData);
            });
        
            it('setter and getter for city works', function () {
                var testData = 'simple test value';
                var address = new Address();
                assert.isString(address.city);
                assert.notEqual(address.city, testData);
                address.city= testData;
                assert.equal(address.city, testData);
            });
        
            it('initialization and getter for zipcode works', function () {
                var testData = '12345';
                var address = new Address({zipcode: testData});
                assert.isString(address.zipcode);
                assert.equal(address.zipcode, testData);
            });
        
            it('setter and getter for zipcode works', function () {
                var testData = 'simple test value';
                var address = new Address();
                assert.isString(address.zipcode);
                assert.notEqual(address.zipcode, testData);
                address.zipcode = testData;
                assert.equal(address.zipcode, testData);
            });

            it('initialization and getter for street works', function () {
                var testData = 'simple test value';
                var address = new Address({street: testData});
                assert.isString(address.street);
                assert.equal(address.street, testData);
            });
        
            it('setter and getter for street works', function () {
                var testData = 'simple test value';
                var address = new Address();
                assert.isString(address.street);
                assert.notEqual(address.street, testData);
                address.street = testData;
                assert.equal(address.street, testData);
            });
        
            it('initialization and getter for street2 works', function () {
                var testData = 'simple test value';
                var address = new Address({street2: testData});
                assert.isString(address.street2);
                assert.equal(address.street2, testData);
            });
        
            it('setter and getter for street2 works', function () {
                var testData = 'simple test value';
                var address = new Address();
                assert.isString(address.street2);
                assert.notEqual(address.street2, testData);
                address.street2 = testData;
                assert.equal(address.street2, testData);
            });
        
            it('initialization and getter for geo works', function () {
                var testData = {latitude: '1234', longitude: '9876'};
                var address = new Address({geo: testData});
                assert.isObject(address.geo);
                assert.equal(address.geo.latitude, testData.latitude);
                assert.equal(address.geo.longitude, testData.longitude);
            });
        
            it('setter and getter for geo works', function () {
                var testData = {latitude: '1234', longitude: '9876'};
                var address = new Address();
                assert.isObject(address.geo);
                assert.isString(address.geo.latitude);
                assert.isString(address.geo.longitude);

                assert.notEqual(address.geo.latitude, testData.latitude);
                assert.notEqual(address.geo.longitude, testData.longitude);

                address.geo = testData;

                assert.equal(address.geo.latitude, testData.latitude);
                assert.equal(address.geo.longitude, testData.longitude);
            });

        });
});
