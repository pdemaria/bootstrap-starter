'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		project: {
			app: ['bootstrap-starter/'],
			assets: ['bower_components/'],
			css: ['<%= project.app %>sass/style.scss']
		},
		'compile-handlebars': {
			compile: { // From globalJsonGlobbedTemplate, see https://www.npmjs.com/package/grunt-compile-handlebars
				files: [{
					expand: true,
					cwd: 'templates/', 
					src: '*.handlebars',
					dest: 'bootstrap-starter/',
					ext: '.html'
				}],
				templateData: 'templates/*.json',
				//helpers: 'templates/*.js',
				partials: 'includes/*.handlebars',
				globals: [{
					textspec: {
						'Greetings': 'Greetings Scrub!'
					}
				}]
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: false,
					precision: 10,
					sourcemap: 'none'
				},
				files: {
					'<%= project.app %>css/style.css': '<%= project.css %>'
				}
			}
		},
		autoprefixer: {
			dist: {
				options: {
					browsers: [
				      //
				      // Official browser support policy:
				      // http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
				      //
				      'Chrome >= 35', // Exact version number here is kinda arbitrary
				      // Rather than using Autoprefixer's native "Firefox ESR" version specifier string,
				      // we deliberately hardcode the number. This is to avoid unwittingly severely breaking the previous ESR in the event that:
				      // (a) we happen to ship a new Bootstrap release soon after the release of a new ESR,
				      //     such that folks haven't yet had a reasonable amount of time to upgrade; and
				      // (b) the new ESR has unprefixed CSS properties/values whose absence would severely break webpages
				      //     (e.g. `box-sizing`, as opposed to `background: linear-gradient(...)`).
				      //     Since they've been unprefixed, Autoprefixer will stop prefixing them,
				      //     thus causing them to not work in the previous ESR (where the prefixes were required).
				      'Firefox >= 31', // Current Firefox Extended Support Release (ESR)
				      // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
				      // NOT the Edge app version shown in Edge's "About" screen.
				      // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
				      // See also https://github.com/Fyrd/caniuse/issues/1928
				      'Edge >= 12',
				      'Explorer >= 9',
				      // Out of leniency, we prefix these 1 version further back than the official policy.
				      'iOS >= 8',
				      'Safari >= 8',
				      // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
				      'Android 2.3',
				      'Android >= 4',
				      'Opera >= 12'
				    ]
				},
				files: {
					'<%= project.app %>css/style.css': ['<%= project.app %>css/style.css']
				}
			}
		}, 
        cssmin: {
            css: {
                src: '<%= project.app %>css/style.css',
                dest: '<%= project.app %>css/style.min.css'
            }
        },
        uglify: {
	        options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
    	},
            js: {
                files: {
                    '<%= project.app %>js/bootstrap.min.js': ['<%= project.assets %>bootstrap/dist/js/bootstrap.js']
                }
            }
        },
        copy: {
			main: {
				files: [
					// Uncompressed CSS - This shouldn't be needed
					//{expand: true, cwd: '<%= project.assets %>bootstrap-sass-official/assets/stylesheets/', src: ['bootstrap.css'],dest: '<%= project.app %>css/', filter: 'isFile'},
					
					// Bootstrap Fonts
					{expand: true, cwd: '<%= project.assets %>font-awesome/', src: ['**/*'], dest: '<%= project.app %>fonts/font-awesome/', filter: 'isFile'},
					// JS
					{expand: true, cwd: '<%= project.assets %>webshim/', src: ['**/*'], dest: '<%= project.app %>js/webshims/'},
					{expand: true, cwd: '<%= project.assets %>jquery.cycle2.min/', src: ['**/*'], dest: '<%= project.app %>js/jquery.cycle2.min/'},
					{expand: true, cwd: '<%= project.assets %>jquery-migrate/', src: ['**/*'], dest: '<%= project.app %>js/jquery-migrate/'},
					{expand: true, cwd: '<%= project.assets %>tether/dist/', src: ['**/*'], dest: '<%= project.app %>js/tether/'}
				]
	    	}
	    },
        watch: {
			options: {
				// Start a live reload server on the default port 35729
				livereload: true,
			},
			sass: {
				files: ['<%= project.app %>sass/{,*/}*.{scss,sass}'],
				tasks: ['sass:dev', 'autoprefixer', 'cssmin:css']
			},
			html: {
				files: ['<%= project.app %>{,*/}*.{html,css,js}'],
			},
			handlebars: {
				files: ['templates/{,*/}*.{handlebars,json}', 'includes/{,*/}*.handlebars'],
				tasks: ['compile-handlebars:compile']				
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.registerTask('default', 'Default task, compiles and minifies bootstrap CSS and JSS, copies files over AND runs the Watch task', ['compile-handlebars:compile', 'sass:dev', 'autoprefixer', 'cssmin:css', 'uglify:js', 'copy:main', 'watch']);
	grunt.registerTask('build', 'Build-only task, compiles SASS and minifies CSS/JS + copies files over to the production folder', ['compile-handlebars:compile', 'sass:dev', 'autoprefixer', 'cssmin:css', 'uglify:js', 'copy:main']);
};