'use strict';

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _mkdirp = require('mkdirp');

var mkdirp = _interopRequireWildcard(_mkdirp);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fileType = require('file-type');
var gm = require('gm');

module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === _config2.default.passkey) {
        if (Object.keys(req.files).length === 1) {
            (function () {
                var fileId = req.body['file-id'];
                var file = req.files['file'];
                var tmppath = file.path;
                var fileName = file.originalname;
                var fileBuffer = fs.readFileSync(tmppath);
                fs.unlink(tmppath);
                var publicPath = fileId + '/' + fileName;
                var privatePath = _config2.default.storagePath + '/' + publicPath;
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
                                mkdirp(_config2.default.storagePath + '/' + fileId + '/minified', function (mkdirErr) {
                                    gm(privatePath).resize(150, 150).compress('jpeg').quality('80').toBuffer('jpeg', function (genThumbnailErr, thumbnail) {
                                        if (genThumbnailErr !== undefined && genThumbnailErr !== null) {
                                            console.error(genThumbnailErr);
                                        }
                                        fs.writeFile(_config2.default.storagePath + '/' + fileId + '/minified/' + fileName, thumbnail, function (writeFileErr) {
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