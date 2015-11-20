'use strict';

var _express = require('express');

var express = _express;

var _bodyParser = require('body-parser');

var bodyParser = _bodyParser;

var _config = require('./config');

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
    console.log(req.path);
    res.sendFile(_config['default'].storagePath + '/' + req.path);
});
app.listen(_config['default'].port.http);