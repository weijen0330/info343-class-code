module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
       connect: {
           server: {
               options:{
                   // don't quit after you are spun up. I want you to run forever
                   keepalive: true,
                   port: 8080,
                   base: 'dist'
               }
           }
       },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/main.css': 'dawg-coffee/scss/main.scss'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/medium-effect.js': 'dawg-coffee/js/medium-effect.js'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dawg-coffee/index.html',
                    'dist/order.html': 'dawg-coffee/order.html'
                }
            }
        },
        copy: {
            dist: {
                expand: true,
                cwd: 'dawg-coffee/img/',
                // * --> copu all files
                src: '*',
                dest: 'dist/img/'
            }
        }
    });

    // default is the key word; type grunt in command line will fire up automatically
    grunt.registerTask('minify', ['uglify', 'htmlmin']);
    grunt.registerTask('default', ['sass', 'minify', 'copy', 'connect']);

};