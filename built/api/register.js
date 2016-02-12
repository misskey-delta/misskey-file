'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var fileType = require('file-type');
var gm = require('gm');
var config_1 = require('../config');
module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    var file = req.file;
    if (passkey !== config_1.default.passkey) {
        return res.sendStatus(400);
    }
    if (file === undefined || file === null) {
        return res.sendStatus(400);
    }
    var fileId = req.body['file-id'];
    var tmppath = file.path;
    var fileName = file.originalname;
    var fileBuffer = fs.readFileSync(tmppath);
    fs.unlink(tmppath);
    var publicPath = fileId + '/' + fileName;
    var privatePath = config_1.default.storagePath + '/' + publicPath;
    mkdirp(path.dirname(privatePath), function (mkdirErr) {
        if (mkdirErr !== null) {
            console.error(mkdirErr);
            return res.sendStatus(500);
        }
        fs.writeFile(privatePath, fileBuffer, function (writeFileErr) {
            if (writeFileErr !== null) {
                console.error(writeFileErr);
                return res.sendStatus(500);
            }
            return res.send(publicPath);
        });
    });
};