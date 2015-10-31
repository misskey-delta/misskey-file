'use strict';

var _fs = require('fs');

var fs = _fs;

var _config = require('./config');

var config = _config;

console.log('Welcome to Misskey UCS');
if (fs.existsSync(config.configPath)) {
    initServer();
} else {
    var conf = config.defaultConfig;
    if (!fs.existsSync(config.configDirectoryPath)) {
        fs.mkdirSync(config.configDirectoryPath);
    }
    fs.writeFile(config.configPath, JSON.stringify(conf, null, '\t'), function (writeErr) {
        if (writeErr) {
            console.log('configの書き込み時に問題が発生しました:');
            console.error(writeErr);
        } else {
            process.exit(0);
        }
    });
}
function initServer() {
    'use strict';
    require('./server');
    require('./debugServer');
}