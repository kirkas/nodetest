define(['marionette', 'views/Signup','views/Login', 'text!templates/homeLayout.html'], function(Marionette, Signup, Login, homeLayout) {
	
	HomeLayout = Backbone.Marionette.Layout.extend({
		template: Handlebars.compile(homeLayout),
		regions: {
			header: "header",
			contentRegion: "#content",
			footer:"footer"
		}
	});
	
		
	return Marionette.Controller.extend({

		initialize: function(){
			this.layout = new HomeLayout();
			App.applicationRegions.show(this.layout)
			this.showSignup()
		},
		
		showSignup: function(){
			var self = this;
			var signupView = new Signup();
			this.layout.contentRegion.show(signupView);
			
			signupView.on("login-link:clicked", function() {
				self.showLogin()
			})
			
			signupView.on("signup:complete", function() {
				App.ShowUserProfile();
			})

		},
		
		showLogin: function(){
			var self = this;
			var loginView = new Login();
			this.layout.contentRegion.show(loginView);
	
			loginView.on("signup-link:clicked", function() {
				self.showSignup()
			})
			
			loginView.on("login:complete", function() {
				App.ShowUserProfile();
			})
			
		}

	});
});