var express = require('express'),
    router = express.Router(),
    async = require('async'),
    Article = require('../models/article'),
    Tag = require('../models/tag'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/tags', function (req, res, next) {
        var options = {
            sortBy: {displayOrder: 1},
            page: req.query.page - 1,
            count: req.query.count
        };
        Tag.list(options, function (err, tags) {
            if (err)
                return res.send({error: err});
            Tag.count({}, function (err, total) {
                if (err)
                    return res.send({error: err});
                res.send({
                    rows: tags,
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
    .get('/api/tags/all', function (req, res, next) {
        var options = {
            fields: '_id, name',
            filter: {enabled: true},
            sortBy: {displayOrder: 1}
        };
        Tag.getAllByFilters(options, function (err, tags) {
            if (err)
                return res.send({error: err});
            res.send(tags);
        });
    })
    .get('/api/tags/articleCount', function (req, res, next) {
        var options = {
            fields: '_id, name',
            filter: {enabled: true},
            sortBy: {displayOrder: 1}
        };
        var resTags = [];
        Tag.getAllByFilters(options, function (err, tags) {
            if (err)
                return res.send({error: err});
            async.forEach(tags, function (tag, callback) {
                var options = {
                    filter: {tags: tag._id}
                };
                Article.getAllByFilters(options, function (err, articles) {
                    var tagObj = tag.toObject();
                    tagObj.articleCount = articles.length;
                    resTags.push(tagObj);
                    callback();
                });
            }, function (err) {
                if (err)
                    return res.send({error: err});
                res.send(resTags);
            });
        });
    })
    .get('/api/tags/:id', function (req, res, next) {
        Tag.getById(req.params.id, function (err, tag) {
            if (err)
                return res.send({error: err});
            res.send(tag);
        });
    })
    .post('/api/tags', jwtAuth, function (req, res, next) {
        var tag = new Tag(req.body);
        tag.save(function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .put('/api/tags/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        Tag.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .delete('/api/tags/:id', jwtAuth, function (req, res, next) {
        Tag.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;