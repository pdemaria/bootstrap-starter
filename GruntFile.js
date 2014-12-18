'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: ['bootstrap-starter/'],
            assets: ['<%= project.app %>'],
            css: ['<%= project.assets %>sass/style.scss']
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false,
                    precision: 10
                },
                files: {
                    'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.css': '<%= project.css %>'
                }
            }
        },
		autoprefixer: { //NEEDS WORK!
			dist: {
				options: {
					browsers: ['last 2 versions', '> 1%', 'ie 8']
				},
				files: {
					'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.css': ['bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.css']
				}
			}
		}, 
        cssmin: {
            css: {
                src: 'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.css',
                dest: '<%= project.assets %>css/bootstrap.min.css'
            }
        },
        uglify: {
	        options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
    	},
            js: {
                files: {
                    '<%= project.assets %>js/bootstrap.min.js': ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
                }
            }
        },
        copy: {
			main: {
				files: [
					//Bootstrap Fonts
					{expand: true, cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', src: ['**/*'], dest: '<%= project.assets %>fonts/bootstrap/', filter: 'isFile'},
					// JS
					{expand: true, cwd: 'bower_components/webshim/', src: ['**/*'], dest: '<%= project.assets %>js/webshims/'},
					{expand: true, cwd: 'bower_components/modernizr/', src: ['**/*'], dest: '<%= project.assets %>js/modernizr/'},
					{expand: true, cwd: 'bower_components/jquery.cycle2.min/', src: ['**/*'], dest: '<%= project.assets %>js/jquery.cycle2.min/'},
					{expand: true, cwd: 'bower_components/jquery-migrate/', src: ['**/*'], dest: '<%= project.assets %>js/jquery-migrate/'}
				]
	    	}
	    },
        watch: {
			options: {
				// Start a live reload server on the default port 35729
				livereload: true,
    		},
            sass: {
                files: ['<%= project.assets %>sass/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev']
            },
            html: {
                files: ['<%= project.assets %>{,*/}*.{html,css,js}'],
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