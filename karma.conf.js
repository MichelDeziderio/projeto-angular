module.exports = function (config) {
	config.set({
		frameworks: ['mocha'],
		files: [
			'src/**/*.js',
			'test/**/*.spec.js'
		],
		browsers: ['Chrome'],
		singleRun: true,
		reporters: ['progress'],
		port: 9876,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		concurrency: Infinity
	});
};