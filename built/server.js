'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var config_1 = require('./config');
var app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'false'
    });
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.get('*', function (req, res) {
    var path = decodeURI(req.path);
    if (path.indexOf('..') !== -1) {
        return res.status(400).send('invalid path');
    }
    if (req.query.download !== undefined) {
        res.header('Content-Disposition', 'attachment');
    }
    if (req.query.mini !== undefined) {
        var tokens = path.split('/');
        var filename = tokens[tokens.length - 1];
        tokens[tokens.length - 1] = 'minified/' + filename;
        var minifiedPath = tokens.join('/');
        res.sendFile(config_1.default.storagePath + '/' + minifiedPath);
    } else {
        res.sendFile(config_1.default.storagePath + '/' + path);
    }
});
app.listen(config_1.default.port.http);