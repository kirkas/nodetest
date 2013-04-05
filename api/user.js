/* ------------------------------------
	USER.JS
	User model and Route function
-------------------------------------*/

/* ---- Login depedencies ---------- */
var passport = require('passport');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var _ = require('underscore');

/* ---- Login Configuration ---------- */
var LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(function(username, password, done) {
	UserModel.findOne({
		username: username
	}, function(err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { dataError: "username", message: 'Incorrect username.' })
		user.comparePassword(password, function(err, isMatch) {
			if (err) return done(err);
			if (isMatch) {
				return done(null, user, {message:'Logged in success'});
			} else {
				return done(null, false, { dataError: "password", message: 'Incorrect password.' });
			}
		});
	});
}));

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login')
}


/* ---- User Schema -----------------*/
var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

var User = mongoose.model('User', userSchema);
var UserModel = mongoose.model('User', User);

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});


/* ---- Output all users ------------*/
exports.list = function(request, response, next){
	start = new Date();
	return UserModel.find(function(error, users) {
		if (!error) {
			console.log("fetch all user, Request took:", new Date() - start, "ms");
			var userList = users;
			delete userList.password
			delete userList.id
			return response.send(userList);
		} else {
			return console.log(error);
		}
	});
}

/* ---- Create a new user -----------*/
exports.create = function(request, response, next){
	start = new Date();
	
	var user = new UserModel({
		username: request.body.username,
		email: request.body.email,
		password: request.body.password
	});
	

	UserModel.find({"username": user.username }, function(error, responseD) { 
		if (!responseD.length == 0) {
			duplicate = true;
			return response.send(409, { 
				dataError: "username",
				message: 'Username already exist!'
			});
		}else{
			UserModel.find({"email": user.email }, function(error, responseD) { 
				if (!responseD.length == 0) {
					duplicate = true;
					return response.send(409, {
						dataError: "email",
						message: 'Email already exist!'
					});
				}else{
					user.save(function(error) {
						if (!error) {
							console.log("created new user '" + user.username + "' (id:" + user.id + "), Request took:", new Date() - start, "ms");
							request.login(user, function(err) {
								if (err) { return next(err); }
								console.log("new user logged in '" + user.username + "' (id:" + user.id + "), Request took:", new Date() - start, "ms");
							});
						} else {console.log(error);}
						return response.send(user);
					});
				}
			});
		}
	});
}

/* ---- Save a User -----------------*/
exports.save = function(request, response, next){
	start = new Date();
	return UserModel.findById(request.params.id, function(error, user) {
		user.username = request.body.username;
		user.email = request.body.email;
		user.password = request.body.password;
	
		return user.save(function(error) {
			if (!error) {
				console.log("Update user '" + user.username + "' (id:" + request.params.id + "), Request took:", new Date() - start, "ms");
			} else {
				console.log(error);
			}
			return response.send(user);
		});
	});
}

/* ---- Remove a User ---------------*/
exports.remove = function(request, response, next){
	start = new Date();
		return UserModel.findById(request.params.id, function(error, user) {
			return user.remove(function(error) {
				if (!error) {
					console.log("Remove user '" + user.username + "' (id:" + request.params.id + "), Request took:", new Date() - start, "ms");
					response.send('');
				} else {
					console.log(error);
				}
			});
		});
}

/* ---- View a User -----------------*/
exports.view = function(request, response, next){
	start = new Date();
	return UserModel.findById(request.params.id, function(error, user) {
		if (!error) {
			console.log("Get user '" + user.username + "' (id:" + request.params.id + "), Request took:", new Date() - start, "ms");
			response.send(user);
		} else {
			console.log(error);
		}
	});
}

/* ---- Login function --------------*/
exports.login = function(request, response, next){
	passport.authenticate('local', function(err, user, info) {
		if (err) return response.json(418, "something went wtrong");
		if(!user) return response.json(406, info);
		request.logIn(user, function(err) {
			if (err) return response.json(418, "something went wtrong");
			return response.json(200, request.user);
		});
	})(request, response, next);
	
}


/* ---- Logout function -------------*/
exports.logout = function(request, response, next){
	request.logout();
	response.redirect('/');
}