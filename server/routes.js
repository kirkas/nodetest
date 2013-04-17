module.exports = function(app) {
	
		app.get('/', function(req, res, next) {
			var isLoggedIn = false;
			var user = false;
			if(req.isAuthenticated()){
				isLoggedIn = true;
				user = req.user;
			}
		
			res.render('index', {
				isLoggedIn: isLoggedIn,
				user: JSON.stringify(user)
			});
		});
		
		app.get('/login', function(req, res, next) {
			res.redirect('/#login');
		});
		
		app.get('/signup', function(req, res, next) {
			res.redirect('/#signup');
		});
		
		app.get('/test', function(req, res, next) {
			res.render('test');
		});
	
		/* ---- User API --------------------*/
		var user = require('./user');
		
		app.get('/api/users', user.list);
		app.post('/api/user', user.create);
		app.get('/api/user/:id', user.view);
		app.put('/api/user/:id', user.save);
		app.del('/api/user/:id', user.remove);
		app.post('/login', user.login);
		app.get('/logout', user.logout);
		
};