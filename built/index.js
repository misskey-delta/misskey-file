'use strict';

var cluster = require('cluster');
if (cluster.isMaster) {
    console.log('Welcome to Misskey File');
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
} else {
    require('./server');
    require('./api-server');
}
cluster.on('exit', function (worker) {
    console.log('\u001b[1;31m' + worker.id + ' died :(\u001b[0m');
    cluster.fork();
});