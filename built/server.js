'use strict';

var _express = require('express');

var express = _express;

var _multer = require('multer');

var multer = _multer;

var _bodyParser = require('body-parser');

var bodyParser = _bodyParser;

var _config = require('./config');

var app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.post('/register', function (req, res) {
    require('./api/register')(req, res);
});
app.post('/delete', function (req, res) {
    require('./api/delete')(req, res);
});
app.listen(_config['default'].port.internal);