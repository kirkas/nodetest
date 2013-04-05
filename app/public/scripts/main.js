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
    

    
});