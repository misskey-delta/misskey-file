"use strict";
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const fileType = require('file-type');
const gm = require('gm');
const config_1 = require('../config');
module.exports = (req, res) => {
    const passkey = req.body['passkey'];
    const file = req.file;
    if (passkey !== config_1.default.passkey) {
        return res.sendStatus(400);
    }
    if (file === undefined || file === null) {
        return res.sendStatus(400);
    }
    const fileId = req.body['file-id'];
    const tmppath = file.path;
    const fileName = file.originalname;
    const fileBuffer = fs.readFileSync(tmppath);
    fs.unlink(tmppath);
    if (fileName.indexOf('..') > -1) {
        return res.sendStatus(400);
    }
    const publicPath = `${fileId}/${fileName}`;
    const privatePath = `${config_1.default.storagePath}/${publicPath}`;
    mkdirp(path.dirname(privatePath), mkdirErr => {
        if (mkdirErr !== null) {
            console.error(mkdirErr);
            return res.sendStatus(500);
        }
        fs.writeFile(privatePath, fileBuffer, writeFileErr => {
            if (writeFileErr !== null) {
                console.error(writeFileErr);
                return res.sendStatus(500);
            }
            return res.send(publicPath);
        });
    });
};
