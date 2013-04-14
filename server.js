/* ------------------------------------
  SERVER.JS
  Main nodeJS application server
-------------------------------------*/

/* ---- Main dependencies -----------*/

flash = require('connect-flash');
express = require('express');
path = require('path');
passport = require('passport');
util = require('util');
LocalStrategy = require('passport-local').Strategy;
mongoose = require('mongoose');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
ejs = require('ejs');
fs = require('fs');

/* ---- Express Server --------------*/
application_root = __dirname+'/app-build/';
app = express();

app.configure(function() {
  app.use(express.cookieParser('your secret here'));
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'Seekvence secret'}));
  app.set('views', application_root);
  app.use(express.favicon());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(application_root)); 
  app.use('/user/',express.static(application_root)); 
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
require('./api/routes')(app);

app.listen(4711, function() {
  console.log('Express server listening on port %d in %s mode', 4711, app.settings.env);
});