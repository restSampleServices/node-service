module.exports = function (grunt) {
    'use strict';

    /* jshint ignore:start */
    /* Configuration Start */
    var PATH_IN_SRC = 'src/';
    var PATH_IN_SPECS = 'spec/';
    var PATH_IN_DOC = 'doc/';


    var PATH_OUT = 'dist/';
    var PATH_OUT_BUILD = PATH_OUT + 'build/';
    var PATH_OUT_PACKAGE = PATH_OUT + 'package/';
    var PATH_OUT_TESTRESULT = PATH_OUT + 'testresults/';
    var PATH_OUT_DOC = PATH_OUT + 'doc/';

    var options = {
        pkg: grunt.file.readJSON('package.json'),
        config: {

        },
        paths: {
            input: {
                src: PATH_IN_SRC,
                doc: PATH_IN_DOC
            },

            output: {
                dist: PATH_OUT,
                build: PATH_OUT_BUILD,
                doc: PATH_OUT_DOC,
                package: PATH_OUT_PACKAGE,
            }
        }
    };
    /* Configuration End */
    /* jshint ignore:end */
    // load all tasks which defined in package.json
    require('load-grunt-tasks')(grunt);

    //var configs = require('load-grunt-configs')(grunt, options);
    //grunt.initConfig(configs);

    grunt.registerTask('default', ['build']);
    grunt.registerTask('ci', []);
};