var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    md5 = require('md5'),
    jwtAuth = require('../config/jwtAuth.js');

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
        //var user = new User({
        //    userName: 'admin',
        //    password: 'admin',
        //    email: 'admin@ivq.com',
        //    enabled: true,
        //    createTime: Date.now(),
        //    lastLoginTime: Date.now()
        //});
        //user.password = md5(user.password);
        //user.save(function (err) {
			//res.send('successfully');
        //});
    })
    .get('/api/users/:id', function (req, res, next) {
        User.get(req.params.id, function (err, user) {
            if (err)
                return res.send({error: err});
            res.send(user);
        });
    })
    .post('/api/users', jwtAuth, function (req, res, next) {
        var user = new User(req.body);
        user.password = md5(user.password);
        user.save(function (err) {
            if (err)
                return res.send({error: err});
            res.sendStatus(200);
        });
    })
    .put('/api/user/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        User.update2(req.params.id, modify, function (err, user) {
            if (err)
                return res.send({error: err});
            res.sendStatus(200);
        });
    })
    .delete('/api/users/:id', jwtAuth, function (req, res, next) {
        User.delete(req.params.id, function (err) {
            if (err)
                return res.send({error: err});
            res.sendStatus(200);
        });
    });

module.exports = router;