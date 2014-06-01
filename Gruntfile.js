'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // configurable paths
  var Config = {
    coffee: 'coffee',
    app: 'app'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: Config,
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      coffee: {
        files: [
          '<%= config.coffee %>/**/*.coffee'
        ],
        tasks: ['coffee']
      }
    },

    connect: {
      options: {
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      proxies: [{
        context: '/V2',
        host: "services.odata.org",
        https: false,
        changeOrigin: true
      }],
      demo: {
        options: {
          port: SERVER_PORT,
          middleware: function(connect) {
            return [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              lrSnippet,
              mountFolder(connect, Config.app)
            ];
          }
        }
      }
    },

    open: {
      path: 'http://localhost:' + SERVER_PORT
    },

    coffee: {

      app: {
        expand: true,
        flatten: false,
        cwd: '<%= config.coffee %>',
        src: ['**/*.coffee'],
        dest: '<%= config.app %>',
        ext: function(ext) {
          return ext.replace(/coffee$/, 'js');
        }
      }

    }

  });

  grunt.registerTask('server', function(target) {

    grunt.task.run([
      'configureProxies',
      'connect',
      // 'open',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'server'
  ]);

};