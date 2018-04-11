module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: [
                    {'dist/WPQuestetraAddonXMLViewShortcode/js/jquery.questetraAddonView-min.js': 'src/js/jquery.questetraAddonView.js'}
                ]
            }
        },
        less: {
            pre_build: {
                options: {
                    compress: false
                },
                files: {
                    "dist/WPQuestetraAddonXMLViewShortcode/css/style.css": "src/css/style.less"
                }
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'dist/WPQuestetraAddonXMLViewShortcode.zip'
                },
                files: [{expand:true, src:'**', cwd:'dist/WPQuestetraAddonXMLViewShortcode'}]
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-contrib-compress');
    /*
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-less");
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-text-replace");
    grunt.loadNpmTasks("grunt-contrib-compress");
    */

    grunt.registerTask('_dev', ['uglify', 'less', 'compress']);
    grunt.registerTask('default', ['uglify', 'less', 'compress']);
    
};