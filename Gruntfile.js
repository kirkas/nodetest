module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({

		//Read the package.json (optional)
		pkg: grunt.file.readJSON('package.json'),
		
		banner: '/*------------------------------------------------------------------------------ \n'+
						'<%= pkg.name %> - <%= pkg.version %>\n'+
						'author: <%= pkg.author %>\n'+
						'description: <%= pkg.description %>\n'+
						'------------------------------------------------------------------------------*/\n',
						
		projectOption:{
			dist: "app-build"
		},
		
		jshint: {
			gruntfile: {
				src:'Gruntfile.js'
			},
			
			app: {
				src:'app/scripts/**/*.js'
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
					baseUrl: "app/scripts",
					mainConfigFile: "app/scripts/main.js",
					out: "<%= projectOption.dist %>/scripts/main.js"
				}
			}
		},
		
		copy: {
			main: {
				files: [{
					expand: true, 
					flatten: true, 
					src: ['app/index.ejs'], 
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
						src: 'app/css/main.css',
						dest: '<%= projectOption.dist %>/css/main.css'
				}
		},
		
		uglify: {
			build: {
				options: {
					banner: '/*---- Require.js ----------------------------------------------------------- */\n'
				},
				src: 'app/components/requirejs/require.js',
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
					'app/css/main.css': 'app/css/main.scss'
				}
			}
		},
				
		watch: {
			styles: {
				files: [
					'app/css/*.scss'
				],
				tasks: ['sass']
			},
			scripts: {
				files: [
					'Gruntfile.js', 
					'app/scripts/**/**/**/*.js',
					'server/**/*.js'
				],
				tasks: ['jshint']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	// Default task.
	grunt.registerTask('default', ['sass', 'jshint', 'watch']);
	grunt.registerTask('build', ['sass', 'jshint' ,'clean','requirejs','cssmin', 'uglify', 'copy']);
	
};