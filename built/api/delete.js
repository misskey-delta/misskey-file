'use strict';

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = function (req, res) {
    var passkey = req.body['passkey'];
    if (passkey === _config2.default.passkey) {
        var path = req.body['path'];
        fs.unlink(path, function (err) {
            if (err !== null) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
};