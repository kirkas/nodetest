require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    backbone: '../components/backbone/backbone',
    'backbone.validation': '../components/backbone-validation/src/backbone-validation',
    marionette: '../components/marionette/lib/backbone.marionette',
    text: '../components/text/text',
    handlebars: '../components/handlebars/handlebars',
    io: '../components/socket.io-client/dist/socket.io'
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

    'App': {
      deps: ['marionette']
    }
  }
});

require(['App'], function(App) {
    App.start();
});