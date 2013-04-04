/* ------------------------------------
  SERVER.JS
  Main nodeJS application server
-------------------------------------*/

/* ---- Main dependencies -----------*/
var application_root = __dirname+'/app';

var flash = require('connect-flash');
var express = require('express');
var path = require('path');
var passport = require('passport');
var util = require('util');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


/* ---- Express Server --------------*/
var app = express();

app.configure(function() {
  app.use(express.cookieParser('your secret here'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: 'keyboard cat'
  }));
  
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'public')));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

/* ---- Moongoose DB connect --------*/
mongoose.connect('localhost', 'test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

/* ---- Routes --------------------*/
app.get('/', function(req, res, next) {
  res.sendfile(application_root +'/views/index.html');
});

app.get('/test', function(req, res, next) {
  res.sendfile(application_root+'/views/test.html');
});



/* ---- User API --------------------*/
var user = require('./api/user');

app.get('/api/users', user.list);
app.post('/api/user', user.create);
app.get('/api/user/:id', user.view);
app.put('/api/user/:id', user.save);
app.delete('/api/user/:id', user.remove);
app.post('/login', user.login);
app.get('/login', user.isLogged);
app.get('/logout', user.logout);





app.listen(4711, function() {
  console.log('Express server listening on port %d in %s mode', 4711, app.settings.env);
});