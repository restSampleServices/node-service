'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains


describe('Persistence', function () {

    var fakeDBConnection;
    before(function () {
        fakeDBConnection = require('../../src/persistence/fakeDBConnection.js');
    });

    describe('fakeDB Connection',
        function () {
            xit('first test', function () {
                //used for filesystem operation etc
                assert.isDefined(GLOBAL.config);
            });

            xit('second test', function () {
                //used for filesystem operation etc
                assert.isDefined(GLOBAL.config.persistence);
                assert.isDefined(GLOBAL.config.persistence.database);
                assert.isString(GLOBAL.config.persistence.database);
                //only supported databases are allowed
                assert.include(['mock', 'dynamodb'], GLOBAL.config.persistence.database);


            });
        });
});
