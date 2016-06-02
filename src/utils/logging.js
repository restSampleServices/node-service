'use strict';
var clc = require("cli-color");

var log = {
    initialized: false,
    logLevels: {
        debug: 1,
        info: 2,
        warning: 3,
        error: 4
    },
    init: function (nocolor) {
        if (this.initialized) return;
        console.log("initialize logger extension");
        this.initialized = true;

        this.logLevel = this.logLevels.debug;

        var colorMap = {
            //no color for simple log
            log: function (args) {
                return args;
            },
            //magenta for info messages
            info: clc.magenta,
            //yellow for warnings
            warn: clc.yellow,
            //red for errors
            error: clc.red
        };

        ['log', 'info', 'warn', 'error'].forEach(function (logType) {
            var org = console[logType].bind(console);
            console[logType] = function () {
                //TODO P2: add additional log levels and usage
                if (logType == 'log' && this.logLevel <= 1 /*this.logLevels.debug*/ ||
                    logType != 'log'
                )
                    arguments[0] = colorMap[logType]((new Date().toISOString())) + ' - ' + arguments[0];

                org.apply(console, arguments);
            };
        });
    },



    logLevel: 0,
    info: function () {
        //console.log(clc.blue(new Date().toISOString()) + ' ' + msg, arguments)
        //Array.prototype.unshift.call(arguments, clc.blue((new Date().toISOString())) + ' ' + arguments[0]);
        arguments[0] = clc.blue((new Date().toISOString())) + ' ' + arguments[0];
        console.log.apply(console, arguments);
    },
};
//module.exports.init = init;
module.exports = log;