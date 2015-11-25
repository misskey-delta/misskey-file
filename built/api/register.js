'use strict';

var _fs = require('fs');

var fs = _fs;

var _path = require('path');

var path = _path;

var _mkdirp = require('mkdirp');

var mkdirp = _mkdirp;

var _config = require('../config');

var fileType = require('file-type');
var gm = require('gm');

module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === _config['default'].passkey) {
        if (Object.keys(req.files).length === 1) {
            (function () {
                var fileId = req.body['file-id'];
                var file = req.files['file'];
                var tmppath = file.path;
                var fileName = file.originalname;
                var fileBuffer = fs.readFileSync(tmppath);
                fs.unlink(tmppath);
                var publicPath = fileId + '/' + fileName;
                var privatePath = _config['default'].storagePath + '/' + publicPath;
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
                        var detectedFileType = fileType(fileBuffer);
                        if (detectedFileType === null) {
                            return res.send(publicPath);
                        }
                        switch (detectedFileType.mime) {
                            case 'image/jpeg':
                            case 'image/png':
                            case 'image/gif':
                            case 'image/webp':
                            case 'image/tiff':
                            case 'image/bmp':
                                mkdirp(_config['default'].storagePath + '/' + fileId + '/minified', function (mkdirErr) {
                                    gm(privatePath).resize(150, 150).compress('jpeg').quality('80').toBuffer('jpeg', function (genThumbnailErr, thumbnail) {
                                        fs.writeFile(_config['default'].storagePath + '/' + fileId + '/minified/' + fileName, thumbnail, function (writeFileErr) {
                                            res.send(publicPath);
                                        });
                                    });
                                });
                                break;
                            default:
                                return res.send(publicPath);
                        }
                    });
                });
            })();
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
};