'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

var mockRequire = require('mock-require');


describe('Persistence', function () {

    describe('Product', function () {

        describe('general', function () {

            var productDB, product;
            before(function () {
                productDB = require('../../src/persistence/productPersistence.js');
                product = require('../../src/models/product.js');
            });

            after(function () {});

            it('api functions are defined', function () {
                assert.isDefined(productDB.getAllProducts);
                assert.isFunction(productDB.getAllProducts);
            });

            it('getAllProducts is async', function () {
                assert.instanceOf(productDB.getAllProducts(), Promise);
            });
        });

        describe('development db', function () {

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

        describe('dynamodb', function () {
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
