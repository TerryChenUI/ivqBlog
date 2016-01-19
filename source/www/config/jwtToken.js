var moment = require('moment'),
    jwt = require('jwt-simple'),
    setting = require('../config/setting.js');

module.exports = function (userId) {
    this.expires = moment().add(7, 'days').valueOf();
    this.token = jwt.encode({
        iss: userId,
        exp: this.expires
    }, setting.jwtTokenSecret);
};