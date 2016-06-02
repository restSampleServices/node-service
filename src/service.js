//express is our used rest framework
var express = require('express');
var app = express();

//modify the console log output
var log = require('./utils/logging.js');
log.init();
log.init();
log.init();

//prepare file system operations e.g. load config.json
var fs = require("fs");

var configFile = __dirname + '/config.json';

app.get('/listUsers', function (req, res) {
    res.end(req.toJson());
    return;
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

function startService(port) {
    return;
    console.log('starting rest service...')
    var server = app.listen(port, function () {

        var host = server.address().address
        var port = server.address().port

        console.log("Server is runnning at http://%s:%s", host, port)

    })
}

console.log('search configuration in', configFile);
//var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

console.warn('just a warning');
console.error('wow');
var config;
fs.readFile(configFile, 'utf8', function (err, data) {
    if (err) {
        console.error('failed to read configuration');
        throw err;
    }
    config = JSON.parse(data);
    console.info("configuration loaded\n", data)
    console.log('%s %s prepared', config.name, config.version);
    log.info('%s %s prepared', config.name, config.version);

    startService(config.server.port)
});