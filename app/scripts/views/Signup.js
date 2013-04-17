define(['text!templates/signup.html', 'models/User', 'marionette'], function(template, userModel, Marionette) {

  Signup = Marionette.ItemView.extend({
    //Template HTML string
    template: Handlebars.compile(template),
    className: "signup-box six block centered",
    model: new userModel(),

    events: {
      "submit form": "signup"
    },

    ui: {
      userName: "#user-name",
      userEmail: "#user-email",
      userPassword: "#user-password"
    },


    onRender: function() {
      var self = this;
      Backbone.Validation.bind(this);

      $(this.el).find("form").submit(function(e) {
        e.preventDefault();
      });

    },
    

    signup: function() {
      var self = this;
      
      var attributes = {
        username: self.ui.userName.val(),
        email: self.ui.userEmail.val(),
        password: self.ui.userPassword.val()
      };
      
      this.model.set(attributes);
      
      if (this.model.isValid(true)) {
        this.model.save({}, {
          success: function(model, response) {
            App.CurrentUser = model;
            self.trigger("signup:complete");
          },
          error: function(model, response) {
            var error = JSON.parse(response.responseText);
            if(error.dataError == "email"){
              self.ui.userEmail.removeClass("valid").addClass("invalid");
              alert(error.message);
            }else if(error.dataError == "username"){
              self.ui.userName.removeClass("valid").addClass("invalid");
              alert(error.message);
            }else{
              alert("something went wrong, sorry");
            }
          }
          
        });
        return true;
      }

      return false;

    }

  });

  return Signup;
});