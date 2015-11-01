module.exports = function(grunt) {
  var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['src/**/*.js'],
    },

    webpack: {
      options: webpackConfig,
      build: {
        devtool: 'inline-source-map',
        debug: true,
      }
    },

    'webpack-dev-server': {
      options: {
        webpack: webpackConfig,
        publicPath: webpackConfig.output.publicPath,
        proxy: {
          '/api*': {
            target: 'http://localhost:8000',
            secure: false,
          }
        },
      },
      start: {
        keepAlive: true,
      }
    },

    bower: {
      install: {}
    },

    watch: {
      dev: {
        files: ['src/**/*.js'],
        tasks: ['eslint', 'webpack:build'],
        options: {
          spawn: false,
          atBegin: true,
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['watch']);
};
