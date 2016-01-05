var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    jwt = require('jwt-simple'),
    md5 = require('md5'),
    setting = require('../config/setting.js'),
    moment = require('moment'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/users', function (req, res, next) {
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
            res.send(200);
        });
    })
    .post('/api/users/authenticate', function (req, res, next) {
        User.getByFilter({userName: req.body.userName}, function (err, user) {
            if (err)
                return res.send(err);

            if (!user)
                return res.send(err);

            var password = md5(req.body.password);
            if (password != user.password)
                return res.send(err);

            //token
            var expires = moment().add(7, 'days').valueOf();
            var token = jwt.encode({
                iss: user.id,
                exp: expires
            }, setting.jwtTokenSecret);

            res.send({
                expires: expires,
                token: token,
                data: user
            });
        });
    })
    .put('/api/users', jwtAuth, function (req, res, next) {
        var modify = req.body;
        if (modify.password != undefined) {
            modify.password = md5(modify.password);
        }
        User.update2(req.param.id, modify, function (err) {
            if (err)
                return res.send(err);
            res.send(200);
        });
    })
    .delete('/api/users/:id', jwtAuth, function (req, res, next) {
        User.delete(req.params.id, function (err) {
            if (err)
                return res.send(err);
            res.send(200);
        });
    });

module.exports = router;