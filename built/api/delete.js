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
        rmrf(config_1.default.storagePath + '/' + path + '/../', {
            disableGlob: true
        }, function () {
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(400);
    }
};