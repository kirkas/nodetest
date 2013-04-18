var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
		return connect.static(require('path').resolve(dir));
};

var path = require('path');

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({

		//Read the package.json (optional)
		pkg: grunt.file.readJSON('package.json'),
		
		banner: '/*------------------------------------------------------------------------------ \n'+
						'<%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'+
						'author: <%= pkg.author %>\n'+
						'description: <%= pkg.description %>\n'+
						'------------------------------------------------------------------------------*/\n',
						
		projectOption:{
			app:"app",
			dist: "dist"
		},
		
		jshint: {
			gruntfile: {
				src:'Gruntfile.js'
			},
			
			app: {
				src:'<%= projectOption.app %>/scripts/**/*.js'
			},
			
			server: {
				src:'server/**/*.js'
			}
			
		},
		
		clean: {
			dist:{
				src: "<%= projectOption.dist %>/"
			}
		},
		
		requirejs: {
			compile: {
				options: {
					name:"main",
					baseUrl: "<%= projectOption.app %>/scripts",
					mainConfigFile: "<%= projectOption.app %>/scripts/main.js",
					out: "<%= projectOption.dist %>/scripts/main.js"
				}
			}
		},
		
		copy: {
			main: {
				files: [{
					expand: true, 
					flatten: true, 
					src: ['<%= projectOption.app %>/index.ejs'], 
					dest: '<%= projectOption.dist %>/', 
					filter: 'isFile'
				}]
			}
		},

		cssmin: {
				options:{
					banner: '<%= banner %>'
				},
				
				main: {
						src: '<%= projectOption.app %>/css/main.css',
						dest: '<%= projectOption.dist %>/css/main.css'
				}
		},
		
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			main: {
				src: ['app/css/main.css']
			},
		},
		
		uglify: {
			build: {
				options: {
					banner: '/*---- Require.js ----------------------------------------------------------- */\n'
				},
				src: '<%= projectOption.app %>/components/requirejs/require.js',
				dest: '<%= projectOption.dist %>/components/requirejs/require.js'
			},
			
			main: {
				options: {
					banner: '<%= banner %>'
				},
				src: '<%= projectOption.dist %>/scripts/main.js',
				dest: '<%= projectOption.dist %>/scripts/main.js'
			}
		},
		
		sass: {
			dist: {
				files: {
					'<%= projectOption.app %>/css/main.css': 'app/css/main.scss'
				}
			}
		},
				
		watch: {
			sass: {
				files: [
					'<%= projectOption.app %>/css/*.scss'
				],
				tasks: ['sass']
			},
			css:{
				files:[
					'<%= projectOption.app %>/css/main.css'
				],
				tasks: ['csslint']
			},
			scripts: {
				files: [
					'Gruntfile.js', 
					'<%= projectOption.app %>/scripts/**/*.js',
					'server/**/*.js'
				],
				tasks: ['jshint']
			},
			livereload: {
				files: [
					'<%= projectOption.app %>/*.ejs',
					'<%= projectOption.app %>/scripts/templates/*.html',
					'<%= projectOption.app %>/css/main.css'
				],
				tasks: ['livereload']
			}
		},
		
		express: {
			livereload: {
				options: {
					port: 9000,
					monitor: {},
					debug: true,
					server: path.resolve('./server/server'),
					middleware: function(connect, options) {
						return [lrSnippet, folderMount(connect, "./app")];
					}
				}
			}
		}
		
	});
	


	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.renameTask('regarde', 'watch');
	
	
	grunt.registerTask('server', 'Run server', function () {
			var tasks = ['livereload-start', 'express', 'watch'];
			grunt.option('force', true);
			grunt.task.run(tasks);
	});
	
	// Default task.
	grunt.registerTask('default', function(){
		grunt.log.write('Welcome to seekvence grunt project\n');
		grunt.log.write('Use "grunt compile" to compile sass and jshint your javascript\n');
		grunt.log.write('Use "grunt build" to compile your entire project\n');
		
	});
	grunt.registerTask('compile', ['sass', 'jshint']);
	grunt.registerTask('build', ['sass', 'jshint' ,'clean','requirejs','cssmin', 'uglify', 'copy']);
	
};