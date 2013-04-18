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
io = require('socket.io');
http = require('http');

/* ---- Express Server --------------*/

Config = require('./server/config');
conf = new Config();

application_root = __dirname+conf.directory;
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
mongoose.connect('mongodb://localhost/'+conf.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {console.log('Connected to DB: '+conf.db);});

/* ---- Routes --------------------*/
require('./server/routes')(app);


var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(conf.port, function() {
  console.log('Express server listening on port %d in %s mode', conf.port, app.settings.env);
});





io.sockets.on('connection', function (socket) {
  socket.emit('server running');
  socket.on('client running', function () {
    console.log("client running");
  });
});


exports = module.exports = server;

exports.use = function() {
  app.use.apply(app, arguments);
};