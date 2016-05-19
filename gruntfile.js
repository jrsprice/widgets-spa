'use strict';

var modRewrite  = require('connect-modrewrite');

module.exports = function(grunt){
    grunt.initConfig({
        watch: {
            dev: {
                files: [
                    'gruntfile.js',
                    'app/**/*.js',
                    'app/**/*.html'
                ],
                // tasks: [], // Concat, minify etc
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+,
                    // "nospawn: true" for lower versions.
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : 'app/*'
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './',
                        middleware: [
                            modRewrite([
                                '!\\.\\w+$ /index.html [L]'
                            ])
                        ]
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('dev', ['browserSync:dev', 'watch:dev']);

};
