var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    md5 = require('md5'),
    jwtAuth = require('../config/jwtAuth.js'),
    jwtToken = require('../config/jwtToken.js');

router
    .post('/api/account/authenticate', function (req, res, next) {
        var password = md5(req.body.password);
        User.getByFilter({
            $and: [
                {$or: [{userName: req.body.userName}, {email: req.body.userName}]},
                {password: password}
            ]
        }, function (err, user) {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.send({errors: '账号或密码不正确'});

            if (!user.enabled)
                return res.send({errors: '用户账号被禁用'});

            var jt = new jwtToken(user.id);
            res.send({
                expires: jt.expires,
                token: jt.token,
                user: user
            });
        });
    })
    .put('/api/account/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        User.updateAndReturnNew(req.params.id, modify, function (err, user) {
            if (err)
                return res.status(500).send(err);

            var jt = new jwtToken(user.id);
            res.send({
                expires: jt.expires,
                token: jt.token,
                user: user
            });

        });
    })
    .put('/api/account/updatePassword/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        User.getById(req.params.id, function (err, user) {
            if (err)
                return res.status(500).send(err);

            if (modify.password != undefined)
                modify.password = md5(modify.password);

            if (user.password != modify.password)
                return res.send({errors: '旧密码不正确'});

            if (modify.newPassword != undefined) {
                modify.password = md5(modify.newPassword);
                delete modify.newPassword;
            }

            User.updateAndReturnNew(req.params.id, modify, function (err, user) {
                if (err)
                    return res.status(500).send(err);

                var jt = new jwtToken(user.id);
                res.send({
                    expires: jt.expires,
                    token: jt.token,
                    user: user
                });

            });
        });
    });

module.exports = router;