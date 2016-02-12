'use strict';

var fs = require('fs');
var config_1 = require('../config');
module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === config_1.default.passkey) {
        var path = req.body['path'];
        deleteFolderRecursive(config_1.default.storagePath + '/' + path + '/../');
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}