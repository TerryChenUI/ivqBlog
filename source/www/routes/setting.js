var express = require('express'),
    router = express.Router(),
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
    .put('/api/settings/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        Setting.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send({error: err});
            res.sendStatus(200);
        });
    });

module.exports = router;