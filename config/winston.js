
var appRoot = require('app-root-path');
var winston = require('winston');
var options = {
    file: {
        level: 'error',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
var logger = new winston.Logger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.error(message);
    },
};
module.exports = logger;