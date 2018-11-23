'use strict';

const winston = require('winston');

module.exports = {
	getLogger: (tag) => {
		return new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					colorize: true,
					prettyPrint: true,
					timestamp: true,
					label: tag
				})
			]
		})
	}
};