'use strict';

var _cluster = require('cluster');

var cluster = _cluster;

if (cluster.isMaster) {
    console.log('Welcome to Misskey UCS');
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
} else {
    require('./server');
    require('./apiServer');
}
cluster.on('exit', function (worker) {
    console.log('\u001b[1;31m' + worker.id + ' died :(\u001b[0m');
    cluster.fork();
});