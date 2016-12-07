'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

var httpMocks = require('node-mocks-http'); //doc: https://github.com/howardabrams/node-mocks-http
var errorHandler = require('../../src/rest/errorHandler.js');

describe('rest', function() {

    var errorPages = {};
    before(function(done) {
        var fs = require('fs');
        fs.readFile(__dirname + '/../../src/html/404.html', 'utf8', function(err, html) {
            if (err) {
                errorPages.P404 = '';
                throw err;
            } else {
                errorPages.P404 = html;
            }
            done();
        });
    });

    describe('errorHandler',
        function() {
            describe('InternalServerError', function() {
                it('is defined', function() {
                    //used for filesystem operation etc
                    assert.isDefined(errorHandler.InternalServerError);
                    assert.isFunction(errorHandler.InternalServerError);
                });

                it('throws error if response parametr is empty', function() {
                    var fail = function() {
                        errorHandler.InternalServerError(Error('lorem ipsum'), null);
                    };

                    assert.throws(fail, Error);
                });

                it('should not fail with a defect response parameter', function() {
                    var fail = function() {
                        errorHandler.InternalServerError(Error('lorem ipsum'), {
                            'some': 'data'
                        });
                    };
                    expect(fail).to.not.throw(Error);
                });

                it('do fail if err parameter is missing', function() {
                    var fail = function() {
                        var response = httpMocks.createResponse();
                        errorHandler.InternalServerError(null, response);
                    };
                    assert.throws(fail, Error);
                    expect(fail).to.throw(Error);
                });

                it('sending response with errorcode 500', function() {
                    var response = httpMocks.createResponse();
                    errorHandler.InternalServerError(Error('lorem ipsum'), response);
                    expect(response.statusCode).to.equal(500);
                });

                it('sending response with defined error message ', function() {
                    var response = httpMocks.createResponse();
                    errorHandler.InternalServerError(Error('lorem ipsum'), response);
                    expect(response._getData()).to.include('lorem ipsum');
                });
            }); //500

            describe('DataNotFound', function() {
                it('is defined', function() {
                    //used for filesystem operation etc
                    assert.isDefined(errorHandler.DataNotFound);
                    assert.isFunction(errorHandler.DataNotFound);
                });

                it('do fail if response parameter is empty', function() {
                    var fail = function() {
                        errorHandler.DataNotFound(Error('lorem ipsum'), null);
                    };
                    assert.throws(fail, Error);
                    expect(fail).to.throw(Error);
                });

                it('do fail if err parameter is missing', function() {
                    var fail = function() {
                        var response = httpMocks.createResponse();
                        errorHandler.DataNotFound(null, response);
                    };
                    assert.throws(fail, Error);
                    expect(fail).to.throw(Error);
                });

                it('sending response with errorcode 404', function(done) {

                    var response = httpMocks.createResponse({
                        eventEmitter: require('events').EventEmitter
                    });
                    //capture the send event to see the switched status
                    response.on('send', () => {
                        expect(response.statusCode).to.equal(404);
                        done();
                    });
                    //do the call
                    errorHandler.DataNotFound(Error('lorem ipsum'), response);
                    //it is also possible to wait a specific time
                    /*setTimeout(function () {
                        expect(response.statusCode).to.equal(404);
                        done();
                    }, 1000);*/
                });

                it('sending response is the 404.html', function(done) {
                    var response = httpMocks.createResponse({
                        eventEmitter: require('events').EventEmitter
                    });
                    //capture the send event to see the switched status
                    response.on('send', () => {
                        expect(response._getData()).to.include(errorPages.P404);
                        done();
                    });
                    errorHandler.DataNotFound(Error('lorem ipsum'), response);
                });
            }); //500


        });
});
