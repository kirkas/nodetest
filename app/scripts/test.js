require.config({
  paths: {
		jquery: '../components/jquery/jquery',
		underscore: '../components/underscore/underscore',
		backbone: '../components/backbone/backbone',
		'backbone.validation': '../components/backbone-validation/src/backbone-validation',
		marionette: '../components/marionette/lib/backbone.marionette',
		text: '../components/text/text',
		handlebars: '../components/handlebars/handlebars',
		"jasmine": '../components/jasmine/lib/jasmine-core/jasmine',
		"jasmine-html": '../components/jasmine/lib/jasmine-core/jasmine-html',
		"jasmine-jquery": '../components/jasmine-jquery/lib/jasmine-jquery',
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
		},

		"jasmine": {
			exports: 'jasmine'
		},

		"jasmine-html": {
      exports: 'jasmine',
      deps:['jasmine']
    },

    "jasmine-jquery": {
			exports: 'jasmine',
			deps:['jasmine']
		}
  }

});


require(['jasmine', 'jasmine-html', 'jasmine-jquery', 'globals/validation'], function(jasmine) {

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
	
	var htmlReporter = new jasmine.HtmlReporter();
	
	jasmineEnv.addReporter(htmlReporter);
	
	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};
	
	var specs = [];
	specs.push('spec/appSpec');
	specs.push('spec/signupSpec');

	require(specs, function(){
		jasmineEnv.execute();
	});

});