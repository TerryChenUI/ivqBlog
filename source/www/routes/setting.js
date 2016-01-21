var express = require('express'),
    router = express.Router(),
    async = require('async'),
    Setting = require('../models/setting'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/settings', function (req, res, next) {
        Setting.list(function (err, settings) {
            if (err)
                return res.send({error: err});
            res.send(settings);
        });
    })
    .put('/api/settings', jwtAuth, function (req, res, next) {
        var modify = req.body;
        var keys = Object.keys(modify);
        async.forEach(keys, function (key, callback) {
            Setting.update2({key: key}, {value: modify[key]}, function (err) {
                callback();
            });
        }, function (err) {
            if (err)
                return res.send({error: err});
            res.sendStatus(200)
        });
    });

module.exports = router;