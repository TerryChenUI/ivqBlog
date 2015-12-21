/**
 * Created by tchen on 2015/7/24.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../models/user');

router
    .get('/api/users', function (req, res, next) {
        var options = {};
        if (req.query.pageIndex != null) {
            var pageIndex = (req.query.pageIndex > 0 ? req.query.pageIndex : 1) - 1;
            var pageSize = 10;
            options = {
                pageIndex: pageIndex,
                pageSize: pageSize
            };
        }
        User.list(options, function (err, users) {
            res.send(users);
        });
    })
    .get('/api/users/:id', function (req, res, next) {
        User.get(req.params.id, function (err, user) {
            res.send(user);
        });
    })
    .post('/api/users', function (req, res, next) {
        //var user = new User(req.body);
        var user = new User({
            UserName : 'admin',
            Password: "123456"
        });
        user.save(function (err) {
            if (err)
                return res.send(err);
            //return res.render('500');
            res.send('/user/' + user.Id);
        });
    })
    .put('/api/users', function (req, res, next) {
        User.update(function (err) {
            if (err)
                return res.send(err);
            //return res.render('500');
            res.send('/users/' + user.Id);
        });
    })
    .delete('/api/users/:id', function (req, res, next) {
        User.delete(req.params.id, function (err) {

        });
    });

module.exports = router;