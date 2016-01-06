var jwt = require('jwt-simple'),
    setting = require('../config/setting.js');

module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        var decoded = jwt.decode(token, setting.jwtTokenSecret);
        if (!decoded) {
            res.status(403).send({error: 'Failed to authenticate token.'});
        }
        if (decoded.exp <= Date.now()) {
            res.status(403).send({error: 'Failed to authenticate token.'});
        }
        next();
    } else {
        res.status(403).send({
            error: 'No token provided.'
        });
    }
};