'use strict';

var _cluster = require('cluster');

var cluster = _interopRequireWildcard(_cluster);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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