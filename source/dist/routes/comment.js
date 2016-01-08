var express = require('express'),
    router = express.Router(),
    Article = require('../models/article'),
    Comment = require('../models/comment'),
    jwtAuth = require('../config/jwtAuth.js'),
    setting = require('../config/setting.js');

router
    .get('/api/comments', function (req, res, next) {
        var options = {
            sortBy: {_id:-1},
            page: req.query.page - 1,
            count: req.query.count
        };
        Comment.list(options, function (err, comments) {
            Comment.count({}, function (err, total) {
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
            res.send({
                error: err,
                data: comment
            });
        });
    })
    .post('/api/comments', function (req, res, next) {
        var comment = new Comment(req.body);
        comment.save(function (err, newComment) {
            if (err)
                return res.send(err);

            Article.getById(newComment.article, function(error, article){
                article.comments.push(newComment._id);
                article.save(function(error){
                    if (err)
                        return res.send(err);

                    res.sendStatus(200);
                })
            });


        });
    })
    .put('/api/comments/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        Comment.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .delete('/api/comments/:id', jwtAuth, function (req, res, next) {
        Comment.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;