require.config({
  paths: {
		jquery: 'vendor/jquery/jquery',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		'backbone.validation': 'vendor/backbone-validation/src/backbone-validation',
		marionette: 'vendor/marionette/lib/backbone.marionette',
		text: 'vendor/text/text',
		handlebars: 'vendor/handlebars/handlebars',
		"jasmine": 'vendor/jasmine/lib/jasmine-core/jasmine',
		"jasmine-html": 'vendor/jasmine/lib/jasmine-core/jasmine-html',
		"jasmine-jquery": 'vendor/jasmine-jquery/lib/jasmine-jquery'
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