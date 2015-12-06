'use strict';

exports.homeDirPath = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
exports.configDirName = '.misskey';
exports.configFileName = 'file.json';
exports.configDirectoryPath = exports.homeDirPath + '/' + exports.configDirName;
exports.configPath = exports.configDirectoryPath + '/' + exports.configFileName;
exports.default = loadConfig();
function loadConfig() {
    'use strict';

    try {
        return require(exports.configPath);
    } catch (e) {
        return null;
    }
}
exports.defaultConfig = {
    passkey: "",
    port: {
        internal: 616,
        http: 80,
        https: 443
    },
    storagePath: ""
};