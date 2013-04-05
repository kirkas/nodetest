define(['marionette', 'text!templates/userLayout.html', 'views/User', 'models/User'], function(Marionette, userLayout, UserView, UserModel) {
	
	UserLayout = Backbone.Marionette.Layout.extend({
		template: Handlebars.compile(userLayout),
		regions: {
			header: "header",
			contentRegion: "#content",
			footer:"footer"
		}
	});

	return Marionette.Controller.extend({
	
		initialize: function(){
			this.layout = new UserLayout();
			App.applicationRegions.show(this.layout)
			this.showUser()
		},
		
		
		showUser: function(){
			var userProfileVIew = new UserView({
				model: App.CurrentUser
			})
			
			console.log(App.CurrentUser)
			this.layout.header.show(userProfileVIew)
		}
	
	});
});