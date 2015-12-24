/**
 * Created by tchen on 2015/7/24.
 */
var express = require('express'),
    fs = require('fs'),
    ueConfig = require('../config/ueConfig.js'),
    router = express.Router();

router
    .post('/api/uploads', function (req, res, next) {
        data = {
            "success": true,
            "imgUrl": "/assets/upload/images/16433e01-c.jpg"
        };
        res.json(data);
    })
    .get('/api/ue/uploads', function (req, res, next) {
        var action = req.query.action;
        switch (action) {
            case "config":
                res.send(ueConfig);
                break;
            case "uploadimage":
                // var fstream;
                // req.pipe(req.busboy);
                // req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                //     var filesize = 0;
                //     var ext = path.extname(filename);
                //     var newFilename = (new Date() - 0) + ext;
                //     fstream = fs.createWriteStream(uploadsPath + newFilename);
                //     file.on('data', function (data) {
                //         filesize = data.length;
                //     });
                //     fstream.on('close', function () {
                //         res.send(JSON.stringify({
                //             "originalName": filename,
                //             "name": newFilename,
                //             "url": '/uploads/' + newFilename,
                //             "type": ext,
                //             "size": filesize,
                //             "state": "SUCCESS"
                //         }));
                //     });
                //     file.pipe(fstream);
                // });

                res.send(JSON.stringify({
                    "originalName": 'test',
                    "name": 'test',
                    "url": '/assets/upload/ue/images/16433e01-c.jpg',
                    "type": '.jpg',
                    "size": filesize,
                    "state": "SUCCESS"
                }));
                break;
            case "uploadscrawl":
                console.log("uploadscrawl");
                break;
            case "uploadvideo":
                console.log("uploadvideo");
                break;
            case "uploadfile":
                console.log("uploadfile");
                break;
            case "listimage":
                uploadsPath = './dist/assets/upload/ue/images/';
                fs.readdir(uploadsPath, function (err, files) {
                    var total = 0, list = [];
                    files.sort().splice(req.query.start, req.query.size).forEach(function (t, b) {
                        /^.+.\..+$/.test(t) &&
                        list.push({
                            url: '/assets/upload/ue/images/' + t,
                            mtime: new Date(fs.statSync(uploadsPath + t).mtime).getTime()
                        });
                    });
                    total = list.length;
                    res.json({
                        state: total === 0 ? 'no match file' : 'SUCCESS',
                        list: list,
                        total: total,
                        start: req.query.start
                    });
                });
                break;
            case "listfile":
                console.log("listfile");
                break;
            case "catchimage":
                // var list = [];
                // req.body.source.forEach(function (src, index) {
                //     http.get(src, function (_res) {
                //         var imagedata = '';
                //         _res.setEncoding('binary');
                //         _res.on('data', function (chunk) {
                //             imagedata += chunk
                //         });
                //         _res.on('end', function () {
                //             var pathname = url.parse(src).pathname;
                //             var original = pathname.match(/[^/]+\.\w+$/g)[0];
                //             var suffix = original.match(/[^\.]+$/)[0];
                //             var filename = Date.now() + '.' + suffix;
                //             var filepath = uploadsPath + 'catchimages/' + filename;
                //             fs.writeFile(filepath, imagedata, 'binary', function (err) {
                //                 list.push({
                //                     original: original,
                //                     source: src,
                //                     state: err ? "ERROR" : "SUCCESS",
                //                     title: filename,
                //                     url: '/uploads/catchimages/' + filename
                //                 });
                //             })
                //         });
                //     })
                // });
                // var f = setInterval(function () {
                //     if (req.body.source.length === list.length) {
                //         clearInterval(f);
                //         res.json({state: "SUCCESS", list: list});
                //     }
                // }, 50);
                break;
            default:
                break;
        }
    });


module.exports = router;
