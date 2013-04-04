define(['text!templates/login.html', 'marionette'], function(template, Marionette) {

  Login = Marionette.ItemView.extend({
    //Template HTML string
    template: Handlebars.compile(template),
    className: "login-box",

    events: {
      "submit form": "login",
    },

    ui: {
      userName: "#username-login",
      userEmail: "#user-email-login",
      userPassword: "#user-password-login"
    },
    
    triggers:{
      "click .signup":"signup-link:clicked"
    },

    onRender: function() {
      var self = this;
      $(this.el).find("form").submit(function(e) {
        e.preventDefault();
      });
    },

    login: function() {
      var self = this;
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
          self.trigger("login:complete");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("error")
        }
      });
    }
  });

  return Login;
});