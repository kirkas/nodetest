require.config({
  paths: {
    jquery: 'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    'backbone.validation': 'vendor/backbone-validation/src/backbone-validation',
    marionette: 'vendor/marionette/lib/backbone.marionette',
    text: 'vendor/text/text',
    handlebars: 'vendor/handlebars/handlebars',
  },

  shim: {
    jquery: {
      exports: 'jQuery'
    },

    underscore: {
      exports: '_'
    },

    handlebars: {
      exports: 'Handlebars'
    },

    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    
    marionette: {
      deps: ['jquery', 'underscore', 'backbone', 'handlebars', 'backbone.validation'],
      exports: 'Marionette'
    },
    
    'backbone.validation': {
      deps: ['backbone'],
      exports: 'Backbone.Validation'
    },

    'views/App': {
      deps: ['marionette']
    }
  }
});

require(['views/App'], function(App) {
    App.start();
    
    //Backbone Validation Plugin setup 	
    _.extend(Backbone.Validation.callbacks, {
      valid: function(view, attr, selector) {
        $(view.el).find(".alert-box.error-" + attr).remove();
        $(view.el).find("input[name=" + attr + "]").removeClass("error success").css("border", "3px solid green").addClass("success").prev("label").css("color", "green");
      },
    
      invalid: function(view, attr, error, selector) {
        $(view.el).find(".alert-box.error-" + attr).remove();
        $(view.el).find("input[name=" + attr + "]").removeClass("error success").css("border", "3px solid red").addClass("error").prev("label").css("color", "red").before("<p class='alert-box error-" + attr + "'>" + error + "</p>");
      }
    });
    
});