'use strict';

var _fs = require('fs');

var fs = _fs;

var _config = require('../config');

module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === _config['default'].passkey) {
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