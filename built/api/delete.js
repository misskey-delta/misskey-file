'use strict';

var config_1 = require('../config');
var rmrf = require('rimraf');
module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === config_1.default.passkey) {
        var path = req.body['path'];
        if (path.indexOf('..') > -1) {
            return res.sendStatus(400);
        }
        var a = path.split('/');
        a.pop();
        var resolvedPath = config_1.default.storagePath + '/' + a.join('/');
        console.log('DELETE: ' + resolvedPath);
        rmrf(resolvedPath, {
            disableGlob: true
        }, function (err) {
            if (err !== null) {
                console.error(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(400);
    }
};