define(['text!templates/navigation.html', 'marionette'], function(template, Marionette) {

	Signup = Marionette.ItemView.extend({
		//Template HTML string
		template: Handlebars.compile(template),
		className: "navigation",
		
		tagName:"nav",
	
		serializeData:function(){

			var userLoggedIn = false;
			var userName = false;
			if(this.model !== false){
				userLoggedIn = true;
				userName = this.model.get("username");
			}
			return {
				userLoggedIn: userLoggedIn,
				userName:userName
			}
		}

	});

	return Signup;
});