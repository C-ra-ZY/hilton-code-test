/* eslint valid-jsdoc: "off" */

"use strict";
const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1617960678975_5140";

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
		logger: {
			dir: path.join(__dirname, "../logs"),
		},
		mongoose: {
			client: {
				url: "mongodb://localhost:27017/reservation",
				options: {},
				// mongoose global plugins, expected a function or an array of function and options
				// plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
			},
		},
		security: {
			csrf: false,
		},
	};
};
