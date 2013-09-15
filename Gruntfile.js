/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        node: true,
        expr: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        predef: [ // Used by Mocha and Should
            "should",
            "expect",
            "describe",
            "it",		
            "before",
            "beforeEach",
            "after",	
            "afterEach"
        ]
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: 'test/**/*.js'
      }
    },
    mochacov: {
        coverage: {
          options: {
            coveralls: {
              serviceName: 'travis-ci'
            }
          }
        },
        test: {
          options: {
            reporter: 'spec',
            recursive: true,
            require: 'test/init'
          }
        },
        options: {
          files: 'test/**/*.js'
        }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'mochacov:test']
      }
    }
  });
  
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochacov:test']);
  grunt.registerTask('travis', ['mochacov:coverage']);
};
