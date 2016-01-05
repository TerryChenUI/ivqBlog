var express = require('express'),
    router = express.Router(),
    Category = require('../models/category'),
    jwtAuth = require('../config/jwtAuth.js'),
    setting = require('../config/setting.js');

router
    .get('/api/categories', function (req, res, next) {
        var options = {
            sortBy: {displayOrder:1},
            page: req.query.page - 1,
            count: req.query.count
        };
        Category.list(options, function (err, categories) {
            Category.count({}, function (err, total) {
                res.send({
                    rows: categories,
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
    .get('/api/categories/all', function (req, res, next) {
        var options = {
            filter: {enabled: true},
            sortBy: {displayOrder:1}
        };
        Category.getAllByFilters(options, function (err, categories) {
            res.send({
                error: err,
                data: categories
            });
        });
    })
    .get('/api/categories/:id', function (req, res, next) {
        Category.getById(req.params.id, function (err, category) {
            res.send({
                error: err,
                data: category
            });
        });
    })
    .post('/api/categories', jwtAuth, function (req, res, next) {
        var category = new Category(req.body);
        category.save(function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .put('/api/categories/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        Category.update2(req.params.id, modify, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .delete('/api/categories/:id', jwtAuth, function (req, res, next) {
        Category.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;