var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    gm = require('gm'),
    path = require('path'),
    Busboy = require('busboy'),
    ueConfig = require('../config/ueConfig.js'),
    setting = require('../config/setting.js'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .post('/api/uploads', jwtAuth, function (req, res, next) {
        var busboy = new Busboy({headers: req.headers});
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var filesize = 0;
            var ext = path.extname(filename);
            var newFilename = (new Date() - 0) + ext;
            var fstream = fs.createWriteStream(setting.coverPath + newFilename);
            file.on('data', function (data) {
                filesize = data.length;
            });
            fstream.on('close', function () {
                res.send(JSON.stringify({
                    "success": true,
                    "imgUrl": '/' + setting.coverPath + newFilename
                }));
            });
            file.pipe(fstream);
        });
        req.pipe(busboy);
    })
    .use('/api/ue/uploads', jwtAuth, function (req, res, next) {
        var action = req.query.action;
        switch (action) {
            case "config":
                res.send(ueConfig);
                break;
            case "uploadimage":
                var busboy = new Busboy({headers: req.headers});
                busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                    var filesize = 0;
                    var ext = path.extname(filename);
                    var newFilename = (new Date() - 0) + ext;
                    var fstream = fs.createWriteStream(setting.ueImagesPath + newFilename);
                    file.on('data', function (data) {
                        filesize = data.length;
                    });
                    fstream.on('close', function () {
                        res.send(JSON.stringify({
                            "originalName": filename,
                            "name": newFilename,
                            "url": '/' + setting.ueImagesPath + newFilename,
                            "type": ext,
                            "size": filesize,
                            "state": "SUCCESS"
                        }));
                    });
                    file.pipe(fstream);
                });
                busboy.on('finish', function () {
                    //res.send(JSON.stringify({
                    //    "state": "ERROR"
                    //}));
                });
                req.pipe(busboy);
                break;
            case "listimage":
                fs.readdir(setting.ueImagesPath, function (err, files) {
                    var total = 0, list = [];
                    if (files.length) {
                        files.sort().splice(req.query.start, req.query.size).forEach(function (t, b) {
                            /^.+.\..+$/.test(t) &&
                            list.push({
                                url: '/' + setting.ueImagesPath + t,
                                mtime: new Date(fs.statSync(setting.ueImagesPath + t).mtime).getTime()
                            });
                        });
                        total = list.length;
                    }
                    res.json({
                        state: total === 0 ? 'no match file' : 'SUCCESS',
                        list: list,
                        total: total,
                        start: req.query.start
                    });
                });
                break;
            default:
                break;
        }
    });


module.exports = router;
