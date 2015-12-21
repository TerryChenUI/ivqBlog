/**
 * Created by tchen on 2015/7/24.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
//Article = mongoose.model('Article');
    Article = require('../models/article');


router
    .get('/api/articles', function (req, res, next) {
        var options = {};
        if (req.query.pageIndex != null) {
            var pageIndex = (req.query.pageIndex > 0 ? req.query.pageIndex : 1) - 1;
            var pageSize = 10;
            var filter = {Title: req.query.title, CategoryId: req.query.categoryId};
            var options = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                filter: filter
            };
        }
        Article.list(options, function (err, articles) {
            res.send(articles);
        });
    })
    .get('/api/articles/:id', function (req, res, next) {
        Article.get(req.params.id, function (err, article) {
            res.send(article);
        });
    })
    .get('/api/articles', function (req, res, next) {
        var article = new Article(req.body);
        //var article = new Article({
        //    Title: 'article1',
        //    Description: "description",
        //    Author: "terry",
        //    Views: 10,
        //    Content: "test1",
        //    Publish: true,
        //    PictureId: 1,
        //    CategoryId: 1
        //});
        article.save(function (err) {
            if (err)
                return res.send(err);
            //return res.render('500');
            res.send('/articles/' + article._id);
        });
    })
    .put('/api/articles', function (req, res, next) {
        Article.update(function (err) {
            if (err)
                return res.send(err);
            //return res.render('500');
            res.send('/articles/' + article.Id);
        });
    })
    .delete('/api/articles/:id', function (req, res, next) {
        Article.delete(req.params.id, function (err) {

        });
    });

module.exports = router;
