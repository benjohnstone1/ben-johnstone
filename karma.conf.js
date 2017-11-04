// Karma configuration
// Generated on Fri Oct 27 2017 01:25:17 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
    './node_modules/angular/angular.js',                             // angular
    './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
    './node_modules/angular-mocks/angular-mocks.js',                 // loads our modules for tests
    './test/services/users/users.js',                                 // our Users factory
    // './app.js',                                                  // our angular app
    './test/services/users/users.spec.js',
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    // port: 9876,
    hostname: process.env.IP,
    port: process.env.PORT,
    runnerPort: 0,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
    
  });
};