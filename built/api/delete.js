'use strict';

var fs = require('fs');
var config_1 = require('../config');
module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === config_1.default.passkey) {
        var path = req.body['path'];
        fs.unlink(path, function (err) {
            if (err !== null) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
};