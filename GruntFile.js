'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: ['bootstrap-starter/'],
            assets: ['bower_components/'],
            css: ['<%= project.app %>sass/style.scss']
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
					browsers: ['last 2 versions', '> 1%', 'ie 8']
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
                    '<%= project.app %>js/bootstrap.min.js': ['<%= project.assets %>bootstrap-sass/assets/javascripts/bootstrap.js']
                }
            }
        },
        copy: {
			main: {
				files: [
					// Uncompressed CSS - This shouldn't be needed
					//{expand: true, cwd: '<%= project.assets %>bootstrap-sass-official/assets/stylesheets/', src: ['bootstrap.css'],dest: '<%= project.app %>css/', filter: 'isFile'},
					
					// Bootstrap Fonts
					{expand: true, cwd: '<%= project.assets %>bootstrap-sass/assets/fonts/bootstrap/', src: ['**/*'], dest: '<%= project.app %>fonts/bootstrap/', filter: 'isFile'},
					// JS
					{expand: true, cwd: '<%= project.assets %>webshim/', src: ['**/*'], dest: '<%= project.app %>js/webshims/'},
					{expand: true, cwd: '<%= project.assets %>modernizr/', src: ['**/*'], dest: '<%= project.app %>js/modernizr/'},
					{expand: true, cwd: '<%= project.assets %>jquery.cycle2.min/', src: ['**/*'], dest: '<%= project.app %>js/jquery.cycle2.min/'},
					{expand: true, cwd: '<%= project.assets %>jquery-migrate/', src: ['**/*'], dest: '<%= project.app %>js/jquery-migrate/'}
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
                tasks: ['sass:dev','autoprefixer','cssmin:css']
            },

            html: {
                files: ['<%= project.app %>{,*/}*.{html,css,js}'],
            },
            
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', 'Default task, compiles and minifies bootstrap CSS and JSS, copies files over AND runs the Watch task', ['sass:dev','autoprefixer','cssmin:css', 'uglify:js', 'copy:main','watch']);
    grunt.registerTask('build', 'Build-only task, compiles SASS and minifies CSS/JS + copies files over to the production folder', ['sass:dev','autoprefixer','cssmin:css', 'uglify:js', 'copy:main']);
};