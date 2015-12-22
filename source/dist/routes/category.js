var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Category = require('../models/category');

//req.params.xxxxx
//req.query.xxxxx
//req.body.xxxxx

router
    .get('/api/categories', function (req, res, next) {
        var options = {
            filter: {},
            page: req.query.page,
            count: req.query.count
        };
        Category.list(options, function (err, categories) {
            res.json({
                rows: categories,
                pagination: {
                    count: parseInt(req.query.count),
                    page: parseInt(req.query.page)
                    //pages: Math.round(Category.count() / req.query.count),
                    //size: Category.count()
                }
            });
        });
        //var options = {};
        //if (req.query.pageIndex != null) {
        //    var pageIndex = (req.query.pageIndex > 0 ? req.query.pageIndex : 1) - 1;
        //    var pageSize = 10;
        //    options = {
        //        pageIndex: pageIndex,
        //        pageSize: pageSize
        //    };
        //}
        //Category.list(options, function (err, categories) {
        //    res.send(categories);
        //});
    })
    .get('/api/categories/:id', function (req, res, next) {
        Category.get(req.params.id, function (err, category) {
            res.send(category);
        });
    })
    .post('/api/categories', function (req, res, next) {
        var category = new Category(req.body);
        category.save(function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .put('/api/categories', function (req, res, next) {
        Category.update(function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/categories/:id', function (req, res, next) {
        Category.delete(req.params.id, function (err) {
            if (err)
                return res.send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;