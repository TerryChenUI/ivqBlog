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
            page: req.query.page - 1,
            count: req.query.count
        };
        Category.list(options, function (err, categories) {
            categories.forEach(function (category) {
                if (category.parentId == 0) {
                    category.parentName = '父类别';
                } else {
                    Category.getById(category.parentId, function (err, parentCategory) {
                        category.parentName = parentCategory.name;
                    });
                }
                return category;
            });
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
    .get('/api/categories/parents', function (req, res, next) {
        var filter = {parentId: 0};
        Category.getAllByFilters(filter, function (err, categories) {
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
    .post('/api/categories', function (req, res, next) {
        var category = new Category(req.body);
        category.save(function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .put('/api/categories/:id', function (req, res, next) {
        var model = req.body;
        Category.update(req.params.id, model, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    })
    .delete('/api/categories/:id', function (req, res, next) {
        Category.delete(req.params.id, function (err) {
            if (err)
                return res.send(error);
            res.sendStatus(200);
        });
    });

module.exports = router;