'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

var config = require(__dirname + '/../src/config.json');

describe('config.json', function() {

    before(function(done) {
        done();
    });


    describe('branding information',
        function() {
            it('config contains technical product name', function() {
                //used for filesystem operation etc
                assert.isDefined(config.technicalProductName);
                assert.isString(config.technicalProductName);
            });

            it('config contains product name', function() {
                assert.isDefined(config.productName);
            });

            it('config contains major and minor version', function() {
                //used from build system
                assert.isDefined(config.version.major);
                assert.isDefined(config.version.minor);
            });
        });

    describe('service configuration', function() {

        it('should define port', function() {
            assert.isDefined(config.server);
            assert.isDefined(config.server.port);
        });
    });

    xdescribe('database configuration', function() {

        it('default db is allowed value', function() {
            assert.isDefined(config.persistence);
            assert.isDefined(config.persistence.database);
            assert.include(['mock', 'dynamodb'], config.persistence.database);
        });
    });
});
