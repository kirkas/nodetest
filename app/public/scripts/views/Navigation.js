define(['text!templates/navigation.html', 'marionette'], function(template, Marionette) {

	Signup = Marionette.ItemView.extend({
		//Template HTML string
		template: Handlebars.compile(template),
		className: "navigation",
		
		
		initialize:function(){
			this.model = App.CurrentUser;
			// this.bindTo(this.model, "change add reset", function(){
			// 	this.render();
			// 	console.log("modelchange")
			// });
			
			if(!this.model){
				
			}
		},
	
		serializeData:function(){

			var userLoggedIn = false;
			var userName = false;
			if(this.model !== false){
				// console.log(this.model.get("username"))
				userLoggedIn = true;
				userName = this.model.get("username");
			}
			console.log(this.model)

			
			return {
				userLoggedIn: userLoggedIn,
				userName:userName
			}
		}

	});

	return Signup;
});