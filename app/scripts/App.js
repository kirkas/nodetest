define([
  'controllers/HomeController',
  'controllers/UserController',
  'models/User',
  'views/Navigation',
  'io'
],function(
  HomeController,
  UserController,
  UserModel,
  Navigation,
  io
){

  //App setup 	
  App = new Backbone.Marionette.Application();

  _.extend(App, {
    Controllers: {},
    Models: {},
    Views: {},
    Routers: {},
    Collections: {},
    
    ShowUserProfile: function(){
      App.Views.Navigation = new Navigation({model:App.CurrentUser});
      App.headerRegion.show(App.Views.Navigation)
      App.Controllers.User = new UserController;
      
      
      
      
    },
    
    ShowUserSignup: function(){
      App.Views.Navigation = new Navigation({model:App.CurrentUser});
      App.headerRegion.show(App.Views.Navigation)
      App.Controllers.Home = new HomeController;
      
      var router = Backbone.Marionette.AppRouter.extend({
        controller: App.Controllers.Home,
        appRoutes : {
          "signup" : "showSignup",
          "login" : "showLogin"
        },
      });
      
      new router()
    }
    
  });

  App.addRegions({
    headerRegion: "header",
    applicationRegions: "#application",
  });


  //Backbone Validation Plugin setup 	
  _.extend(Backbone.Validation.callbacks, {
    valid: function(view, attr, selector) {
      $(view.el).find(".alert-box.error-" + attr).remove();
      $(view.el).find("input[name=" + attr + "]").removeClass("invalid").addClass("valid")
    },
  
    invalid: function(view, attr, error, selector) {
      $(view.el).find(".alert-box.error-" + attr).remove();
      $(view.el).find("input[name=" + attr + "]").removeClass("valid").addClass("invalid").before("<p class='alert-box error-" + attr + "'>" + error + "</p>");
    }
  });

 
  var socket = io.connect('http://localhost');
  socket.on('server running', function () {
    console.log("server running");
    socket.emit('client running');
  });
  
  // socket.on('userStatus', function (data) {
  //   console.log(data);
  // });
 
  App.addInitializer(function(options) {
    if(CurrentUser){
      App.CurrentUser = new UserModel(CurrentUser);
      App.ShowUserProfile();
    }else{
      App.CurrentUser = false;
      App.ShowUserSignup();
    }
    
    
    Backbone.history.start();
  });


  return App;
});