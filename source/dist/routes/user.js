var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    md5 = require('md5'),
    setting = require('../config/setting.js'),
    moment = require('moment'),
    jwtAuth = require('../config/jwtAuth.js'),
    jwtToken = require('../config/jwtToken.js');

router
    .get('/api/users', jwtAuth, function (req, res, next) {
        //var options = {};
        //if (req.query.pageIndex != null) {
        //    var pageIndex = (req.query.pageIndex > 0 ? req.query.pageIndex : 1) - 1;
        //    var pageSize = 10;
        //    options = {
        //        pageIndex: pageIndex,
        //        pageSize: pageSize
        //    };
        //}
        //User.list(options, function (err, users) {
        //    res.send(users);
        //});
        var user = new User({
            userName: 'admin',
            password: 'admin',
            email: 'terrychen.ui@outlook.com',
            enabled: true,
            createTime: Date.now(),
            lastLoginTime: Date.now()
        });
        user.password = md5(user.password);
        user.save(function (err) {

        });
    })
    .get('/api/users/:id', function (req, res, next) {
        User.get(req.params.id, function (err, user) {
            res.send(user);
        });
    })
    .post('/api/users', jwtAuth, function (req, res, next) {
        var user = new User(req.body);
        user.password = md5(user.password);
        user.save(function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .post('/api/account/authenticate', function (req, res, next) {
        var password = md5(req.body.password);
        User.getByFilter({userName: req.body.userName, password: password}, function (err, user) {
            if (err)
                return res.send(err);

            if (!user)
                return res.send({error: '账号或密码不正确'});

            if (!user.enabled)
                return res.send({error: '用户账号被禁用'});

            var jt = new jwtToken(user.id);
            res.send({
                expires: jt.expires,
                token: jt.token,
                data: user
            });
        });
    })
    .put('/api/account/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        User.updateAndReturnNew(req.params.id, modify, function (err, user) {
            if (err)
                return res.send(err);

            var jt = new jwtToken(user.id);
            res.send({
                expires: jt.expires,
                token: jt.token,
                data: user
            });

        });
    })
    .put('/api/account/updatePassword/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        User.get(req.params.id, function (err, user) {
            if (err)
                return res.send(err);

            if (modify.password != undefined)
                modify.password = md5(modify.password);

            if (user.password != modify.password)
                return res.send({error: '旧密码不正确'});

            if (modify.newPassword != undefined) {
                modify.password = md5(modify.newPassword);
                delete modify.newPassword;
            }

            User.updateAndReturnNew(req.param.id, modify, function (err, user) {
                if (err)
                    return res.send(err);

                var jt = new jwtToken(user.id);
                res.send({
                    expires: jt.expires,
                    token: jt.token,
                    data: user
                });

            });

        });
    })
    .delete('/api/users/:id', jwtAuth, function (req, res, next) {
        User.delete(req.params.id, function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;