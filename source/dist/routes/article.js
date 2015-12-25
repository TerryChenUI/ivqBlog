var express = require('express'),
    router = express.Router(),
    Article = require('../models/article');

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
            if (filter.categoryId == 0) {
                delete filter.categoryId;
            }
        }
        var options = {
            filter: filter,
            sortBy: req.query.sortBy,
            page: req.query.page - 1,
            count: req.query.count
        };
        Article.list(options, function (err, articles) {
            Article.count({}, function (err, total) {
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
        Article.get(req.params.id, function (err, article) {
            res.send({
                error: err,
                data: article
            });
        });
    })
    .post('/api/articles', function (req, res, next) {
        var article = new Article(req.body);
        article.save(function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .put('/api/articles/:id', function (req, res, next) {
        var modify = req.body;
        if (modify.publish) {
            modify.time = {
                publish: Date.now()
            };
        }
        Article.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/articles/:id', function (req, res, next) {
        Article.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;
