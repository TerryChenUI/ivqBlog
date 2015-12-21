module.exports = function(config) {
  config.set({

    basePath: '../..',

    frameworks: ['ng-scenario'],

    port: 9876,

    runnerPort: 9101,

    background: true,
    
    autoWatch: true,

    browsers: ['Chrome'],

    urlRoot: '/__karma/',
    
    reporters: [
        'progress',
        'junit',
        'coverage'
    ],

    junitReporter: {
        outputFile: './test_out/junit/e2e.xml',
        suite: 'e2e',
        useBrowserName: false
    },

    coverageReporter: {
        type: 'html',
        dir: './test_out/coverage/'
    }

  })
}
