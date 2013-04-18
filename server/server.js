
flash = require('connect-flash');
path = require('path');

util = require('util');
LocalStrategy = require('passport-local').Strategy;
passport = require('passport');
mongoose = require('mongoose');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
ejs = require('ejs');
fs = require('fs');
http = require('http');

express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);

Config = require('./config');
conf = new Config();

application_root = __dirname+'./app/';
console.log(application_root);

app.configure(function() {
	app.use(express.cookieParser('your secret here'));
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: 'Seekvence secret'}));
	app.set('views', './app/');
	app.use(express.favicon());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static('./app/')); 
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
require('./routes')(app);

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