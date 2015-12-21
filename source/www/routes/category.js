/**
 * Created by tchen on 2015/7/24.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Category = require('../models/category');

//req.params.xxxxx
//req.query.xxxxx
//req.body.xxxxx

router
    .get('/api/categories', function (req, res, next) {
        var options = {};
        if (req.query.pageIndex != null) {
            var pageIndex = (req.query.pageIndex > 0 ? req.query.pageIndex : 1) - 1;
            var pageSize = 10;
            options = {
                pageIndex: pageIndex,
                pageSize: pageSize
            };
        }
        Category.list(options, function (err, categories) {
            res.send(categories);
        });
    })
    .get('/api/categories/:id', function (req, res, next) {
        Category.get(req.params.id, function (err, category) {
            res.send(category);
        });
    })
    .post('/api/categories', function (req, res, next) {
        var category = new Category(req.body);
        //var category = new Category({
        //    Name : 'category1',
        //    Description: "description",
        //    DisplayOrder: 1,
        //    Enabled: true,
        //    ParentId: 0
        //});
        category.save(function (err) {
            if (err)
                return res.send(err);
            //return res.render('500');
            res.send('/categories/' + category.Id);
        });
    })
    .put('/api/categories', function (req, res, next) {
        Category.update(function (err) {
            if (err)
                return res.send(err);
            //return res.render('500');
            res.send('/categories/' + category.Id);
        });
    })
    .delete('/api/categories/:id', function (req, res, next) {
        Category.delete(req.params.id, function (err) {

        });
    });

module.exports = router;