var express = require('express'),
    router = express.Router(),
    async = require('async'),
    Setting = require('../models/setting'),
    jwtAuth = require('../config/jwtAuth.js'),
    _und = require('underscore');

router
    .get('/api/settings', function (req, res, next) {
        var options = {filter:{}};
        Setting.list(options, function (err, settings) {
            if (err)
                return res.send({error: err});
            res.send(settings);
        });
    })
    .get('/api/settings/getByKey', function (req, res, next) {
        var options = {
            filter: {
                key : new RegExp(req.query.key, "i")
            }
        };
        Setting.list(options, function (err, settings) {
            if (err)
                return res.send({error: err});
            var settingObj = {};
            _und.each(settings, function(setting){
                settingObj[setting.key] = setting.value;
            });
            res.send(settingObj);
        });
    })
    .put('/api/settings', jwtAuth, function (req, res, next) {
        var modify = req.body;
        var keys = Object.keys(modify);
        async.forEach(keys, function (key, callback) {
            Setting.getByKey(key, function (err, setting) {
                if (err)
                    return res.send({error: err});

                if (setting) {
                    Setting.update2({key: key}, {value: modify[key]}, function (err) {
                        callback();
                    });
                } else {
                    var newSetting = new Setting({
                        key: key,
                        value: modify[key]
                    });
                    newSetting.save(function (err) {
                        if (err)
                            return res.send({error: err});
                        callback();
                    });
                }
            });
        }, function (err) {
            if (err)
                return res.send({error: err});
            res.sendStatus(200)
        });
    });

module.exports = router;