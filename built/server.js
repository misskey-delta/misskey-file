'use strict';

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        res.sendFile(_config2.default.storagePath + '/' + minifiedPath);
    } else {
        res.sendFile(_config2.default.storagePath + '/' + path);
    }
});
app.listen(_config2.default.port.http);