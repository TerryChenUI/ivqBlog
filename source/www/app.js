var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');
var jwt = require('jwt-simple');
var uiFolder = "/ui";

//routes
var accounts = require('./routes/account'),
    articles = require('./routes/article'),
    categories = require('./routes/category'),
    users = require('./routes/user'),
    tags = require('./routes/tag'),
    comments = require('./routes/comment'),
    plugins = require('./routes/plugin'),
    settings = require('./routes/setting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(__dirname + uiFolder + '/favicon.ico'));
app.use(express.static(path.join(__dirname, uiFolder)));//TODO:屏蔽访问后端文件
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://www.ivqblog.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//routes
app.use(accounts);
app.use(articles);
app.use(categories);
app.use(users);
app.use(tags);
app.use(comments);
app.use(plugins);
app.use(settings);

app.use(function (req, res) {
    if (req.path.indexOf('/admin/login') >= 0) {
        res.sendFile(__dirname + uiFolder + '/admin/login.html');
    }
    else if (req.path.indexOf('/admin') >= 0) {
        res.sendFile(__dirname + uiFolder + '/admin/index.html');
    }
    else {
        res.sendFile(__dirname + uiFolder + '/index.html');
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({error: err.message});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({error: err.message});
});

module.exports = app;
