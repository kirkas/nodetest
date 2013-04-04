define([
  'controllers/HomeController',
  'controllers/UserController',
  'models/User',
  'views/Navigation'
],function(
  HomeController,
  UserController,
  UserModel,
  Navigation
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
    }
    
  });

  App.addRegions({
    headerRegion: "header",
    applicationRegions: "#application",
  });
      

 
  App.addInitializer(function(options) {
    App.CurrentUser = false;
    
    $.ajax({
      type: "get",
      url: "/login",
      success: function(data) {
        if (data == false) {
          App.ShowUserSignup();
        } else {
          App.CurrentUser = new UserModel(data);
          App.ShowUserProfile();
        }
      },
      error: function(data) {
        App.ShowUserSignup();
      }
    })
    
    Backbone.history.start();
  });


  return App;
});