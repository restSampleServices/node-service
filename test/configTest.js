'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

var config = require(__dirname + '/../src/config.json');

describe('config.json', function () {

    before(function (done) {
        done();
    });


    describe('branding information',
        function () {
            it('config contains technical product name', function () {
                //used for filesystem operation etc
                assert.isDefined(config.technicalProductName);
                assert.isString(config.technicalProductName);
            });

            it('config contains product name', function () {
                assert.isDefined(config.productName);
            });

            it('config contains major and minor version', function () {
                //used from build system
                assert.isDefined(config.version.major);
                assert.isDefined(config.version.minor);
            });
        });

    describe('server configuration', function () {

        it('should define port', function () {
            assert.isDefined(config.server);
            assert.isDefined(config.server.port);
        });
    });

    describe('service configuration', function () {

        it('defines employee service', function () {
            assert.isDefined(config.services.employees);
        });

        describe('employee service configuration', function () {

            it('service is enabled', function () {
                assert.isTrue(config.services.employees.enabled);
            });

            it('endpoints are defined', function () {
                assert.isArray(config.services.employees.endpoints);
                assert.include(config.services.employees.endpoints, '/employees', 'employees endpoint is not defined but referenced in documentation');
            });

            it('persistence is configured', function () {
                var p = config.services.employees.persistence;
                assert.isDefined(p);
                assert.isDefined(p.database);

                assert.equal(p.fakeDB.locale, 'en', 'default database language is not en');
            });

            it('default database is fakeDB', function () {
                var p = config.services.employees.persistence;
                assert.equal(p.database, 'fakeDB', 'default database is not fakeDB');
                assert.isNumber(p.fakeDB.employeeCount);
            });

            it('default language is en', function () {
                var p = config.services.employees.persistence;
                assert.equal(p.fakeDB.locale, 'en', 'default database language is not en');
            });
        });
    });
});
