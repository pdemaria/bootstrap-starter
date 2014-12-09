'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: [''],
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
        cssmin: {
            css: {
                src: 'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.css',
                dest: 'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js': ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
                }
            }
        },
        bower: {
			install: {
				options: {
					targetDir: './bootstrap-starter/assets',
					layout: 'byComponent',
				}
        	}
     	},
        watch: {
            sass: {
                files: ['<%= project.assets %>sass/{,*/}*.{scss,sass}', 'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev', 'cssmin', 'uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.registerTask('default', [
        'watch', 'cssmin:css', 'uglify:js']);
};