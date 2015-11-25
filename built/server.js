'use strict';

var _express = require('express');

var express = _express;

var _bodyParser = require('body-parser');

var bodyParser = _bodyParser;

var _config = require('./config');

var gm = require('gm');
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
    if (req.query.mini !== undefined) {
        gm(_config['default'].storagePath + '/' + path).resize(150, 150).compress('jpeg').quality('80').toBuffer('jpeg', function (err, buffer) {
            res.header('Content-Type', 'image/jpeg');
            res.send(buffer);
        });
    } else {
        res.sendFile(_config['default'].storagePath + '/' + path);
    }
});
app.listen(_config['default'].port.http);