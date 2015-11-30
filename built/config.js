'use strict';

var homeDirPath = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
exports.homeDirPath = homeDirPath;
var configDirName = '.misskey';
exports.configDirName = configDirName;
var configFileName = 'fileServer.json';
exports.configFileName = configFileName;
var configDirectoryPath = homeDirPath + '/' + configDirName;
exports.configDirectoryPath = configDirectoryPath;
var configPath = configDirectoryPath + '/' + configFileName;
exports.configPath = configPath;
exports['default'] = loadConfig();

function loadConfig() {
    'use strict';
    try {
        return require(configPath);
    } catch (e) {
        return null;
    }
}
var defaultConfig = {
    passkey: "",
    port: {
        internal: 616,
        http: 80,
        https: 443
    },
    storagePath: ""
};
exports.defaultConfig = defaultConfig;