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
var ejs = require('ejs');
var fs = require('fs');

/* ---- Express Server --------------*/
var app = express();

app.configure(function() {
  app.use(express.cookieParser('your secret here'));
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'Seekvence secret'}));
  app.set('views', application_root + '/views/');
  app.use(express.favicon());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(application_root+'/public')); 
  app.use('/user/',express.static(application_root+'/public')); 
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

/* ---- Moongoose DB connect --------*/
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {console.log('Connected to DB');});

/* ---- Routes --------------------*/
require('./api/routes').Routes(app);

app.listen(4711, function() {
  console.log('Express server listening on port %d in %s mode', 4711, app.settings.env);
});