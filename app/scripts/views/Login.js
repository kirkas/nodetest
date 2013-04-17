define(['text!templates/login.html', 'marionette', 'models/User'], function(template, Marionette, UserModel) {

  Login = Marionette.ItemView.extend({
    //Template HTML string
    template: Handlebars.compile(template),
    className: "signup-box six block centered",

    events: {
      "submit form": "login"
    },
    
    model: new UserModel(),

    ui: {
      userName: "#username-login",
      userPassword: "#user-password-login"
    },

    onRender: function() {
      $(this.el).find("form").submit(function(e) {
        e.preventDefault();
      });
    },

    login: function() {
      
      var self = this;
      self.ui.userName.removeClass("invalid");
      self.ui.userPassword.removeClass("invalid");
      
      
      $.ajax({
        type: "post",
        url: "/login",
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: {
          'username': self.ui.userName.val(),
          'password': self.ui.userPassword.val()
        },
        success: function(data, textStatus, jqXHR) {
          App.CurrentUser = new UserModel(data);
          self.trigger("login:complete");
        },
        error: function(response, textStatus, errorThrown) {
          var error = JSON.parse(response.responseText);
          if(error.dataError == "username"){
            self.ui.userName.removeClass("valid").addClass("invalid");
            alert(error.message);
          }else if(error.dataError == "password"){
            self.ui.userPassword.removeClass("valid").addClass("invalid");
            alert(error.message);
          }else{
            alert("something went wrong, sorry");
          }
        }
      });
    }
  });

  return Login;
});