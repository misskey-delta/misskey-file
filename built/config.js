'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var homeDirPath = exports.homeDirPath = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
var configDirName = exports.configDirName = '.misskey';
var configFileName = exports.configFileName = 'file.json';
var configDirectoryPath = exports.configDirectoryPath = homeDirPath + '/' + configDirName;
var configPath = exports.configPath = configDirectoryPath + '/' + configFileName;
exports.default = loadConfig();

function loadConfig() {
    'use strict';

    try {
        return require(configPath);
    } catch (e) {
        return null;
    }
}
var defaultConfig = exports.defaultConfig = {
    passkey: "",
    port: {
        internal: 616,
        http: 80,
        https: 443
    },
    storagePath: ""
};