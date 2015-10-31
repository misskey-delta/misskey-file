'use strict';

var _fs = require('fs');

var fs = _fs;

var _path = require('path');

var path = _path;

var _mkdirp = require('mkdirp');

var mkdirp = _mkdirp;

var _config = require('../config');

module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === _config['default'].passkey) {
        if (Object.keys(req.files).length === 1) {
            (function () {
                var file = req.files['file'];
                var tmppath = file.path;
                var fileName = file.originalname;
                var fileBuffer = fs.readFileSync(tmppath);
                fs.unlink(tmppath);
                var publicPath = 'usercontents/' + generateRandom() + '/' + fileName;
                var privatePath = _config['default'].storagePath + '/' + publicPath;
                mkdirp(path.dirname(privatePath), function (mkdirErr) {
                    if (mkdirErr !== null) {
                        console.error(mkdirErr);
                        res.sendStatus(500);
                    } else {
                        fs.writeFile(privatePath, fileBuffer, function (writeFileErr) {
                            if (writeFileErr !== null) {
                                console.error(writeFileErr);
                                res.sendStatus(500);
                            } else {
                                console.log('Registered: ' + privatePath);
                                res.send(publicPath);
                            }
                        });
                    }
                });
            })();
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
};
function generateRandom() {
    'use strict';
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    var rnd = '';
    for (var i = 0; i < 64; i++) {
        rnd += chars[Math.floor(Math.random() * chars.length)];
    }
    return rnd;
}