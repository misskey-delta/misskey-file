"use strict";
const config_1 = require('../config');
const rmrf = require('rimraf');
module.exports = (req, res) => {
    const passkey = req.body['passkey'];
    if (passkey === config_1.default.passkey) {
        const path = req.body['path'];
        if (path.indexOf('..') > -1) {
            return res.sendStatus(400);
        }
        const a = path.split('/');
        a.pop();
        const resolvedPath = `${config_1.default.storagePath}/${a.join('/')}`;
        console.log(`DELETE: ${resolvedPath}`);
        rmrf(resolvedPath, {
            disableGlob: true
        }, (err) => {
            if (err !== null) {
                console.error(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    }
    else {
        res.sendStatus(400);
    }
};
