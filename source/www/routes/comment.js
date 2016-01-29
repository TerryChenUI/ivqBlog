var express = require('express'),
    router = express.Router(),
    Article = require('../models/article'),
    Comment = require('../models/comment'),
    Setting = require('../models/setting'),
    jwtAuth = require('../config/jwtAuth.js'),
    email = require("emailjs"),
    _und = require('underscore');

router
    .get('/api/comments', function (req, res, next) {
        var options = {
            sortBy: {createTime: -1},
            page: req.query.page - 1,
            count: req.query.count
        };
        Comment.list(options, function (err, comments) {
            if (err)
                return res.status(500).send(err);
            Comment.count({}, function (err, total) {
                if (err)
                    return res.status(500).send(err);
                res.send({
                    rows: comments,
                    pagination: {
                        count: parseInt(req.query.count),
                        page: parseInt(req.query.page),
                        pages: Math.round(total / req.query.count),
                        size: total
                    }
                });
            });
        });
    })
    .get('/api/comments/:id', function (req, res, next) {
        Comment.getById(req.params.id, function (err, comment) {
            if (err)
                return res.status(500).send(err);
            res.send(comment);
        });
    })
    .post('/api/comments', function (req, res, next) {
        var comment = new Comment(req.body);
        comment.ipAddress = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        comment.save(function (err, newComment) {
            if (err)
                return res.status(500).send(err);

            Article.getById(newComment.article, function (err, article) {
                if (err)
                    return res.status(500).send(err);
                article.comments.push(newComment._id);
                article.save(function (err) {
                    if (err)
                        return res.status(500).send(err);

                    var filter = {
                        key: new RegExp("setting.email", "i")
                    };
                    Setting.getAllByFilters({filter: filter}, function (err, settings) {
                        var emailSetting = {};

                        _und.each(settings, function (setting) {
                            emailSetting[setting.key] = setting.value;
                        });

                        if (!emailSetting['setting.email.enabled'])
                            return res.sendStatus(200);

                        var message = {
                            text: newComment.content,
                            from: "ivqBlog <terrychen.ui@outlook.com>",
                            to: newComment.userName + " <" + newComment.email + ">",
                            subject: "ivqBlog 回复"
                        };

                        var server = email.server.connect({
                            user: emailSetting['setting.email.user'],
                            password: emailSetting['setting.email.password'],
                            host: emailSetting['setting.email.host'],
                            ssl: emailSetting['setting.email.ssl']
                        });

                        server.send(message, function (err, message) {
                            console.log(err || message);
                            return res.sendStatus(200);
                        });
                    });
                })
            });
        });
    })
    .put('/api/comments/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        Comment.update2(req.params.id, modify, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/comments/:id', jwtAuth, function (req, res, next) {
        Comment.delete(req.params.id, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;