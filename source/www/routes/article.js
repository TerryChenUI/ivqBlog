var express = require('express'),
    router = express.Router(),
    Article = require('../models/article'),
    Category = require('../models/category'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/articles', function (req, res, next) {
        var filter = {};
        if (req.query.filters) {
            filter = JSON.parse(req.query.filters);
            if (filter.title == '' || !filter.title) {
                delete filter.title;
            } else {
                filter.title = new RegExp(filter.title, "i");
            }
            filter.category ? filter.category = parseInt(filter.category) : delete filter.category;
            filter.tags ? filter.tags = parseInt(filter.tags) : delete filter.tags;
        }
        var options = {
            filter: filter,
            sortBy: req.query.sortBy,
            page: req.query.page - 1,
            count: req.query.count
        };
        if (req.query.fields) {
            options.fields = req.query.fields.split(',').join(' ');
        }
        Article.list(options, function (err, articles) {
            if (err)
                return res.send({error: err});
            Article.count({}, function (err, total) {
                if (err)
                    return res.send({error: err});
                res.send({
                    rows: articles,
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
    .get('/api/articles/:id', function (req, res, next) {
        Article.getById(req.params.id, function (err, article) {
            if (err)
                return res.send({error: err});
            if (req.query.action != undefined && req.query.action == 'updateView') {
                article.views += 1;
                article.save(function (err, article) {
                    if (err)
                        return res.send({error: err});
                    res.send(article);
                });
            } else {
                res.send(article);
            }
        });
    })
    .post('/api/articles', jwtAuth, function (req, res, next) {
        var article = new Article(req.body);
        article.save(function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .put('/api/articles/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        if (modify.publish) {
            modify["time.publish"] = Date.now();
        }
        if (modify.meta != undefined) {
            if (modify.meta.author != undefined) {
                modify["meta.author"] = modify.meta.author;
            }
            if (modify.meta.keyword != undefined) {
                modify["meta.keyword"] = modify.meta.keyword;
            }
            if (modify.meta.description != undefined) {
                modify["meta.description"] = modify.meta.description;
            }
            delete modify.meta;
        }
        delete modify.comments;

        Article.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/articles/:id', jwtAuth, function (req, res, next) {
        Article.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;
