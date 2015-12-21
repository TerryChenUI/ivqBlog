module.exports = function(config) {
  config.set({

    basePath: '../..',

    frameworks: ['jasmine'],
    
    port: 9877,

    runnerPort: 9102,

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
        outputFile: './test_out/junit/unit.xml',
        suite: 'unit',
        useBrowserName: false
    },

    coverageReporter: {
        type: 'html',
        dir: './test_out/coverage/'
    }
    
  })
}
