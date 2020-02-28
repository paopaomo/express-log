const winston = require('winston');
const { getBasicLog, myFormat } = require("../helper/log");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: myFormat
});

const createConsoleLog = (meta) => {
    console.log = console.info = (message) => {
        const log = {
            ...meta,
            logs: [{
                event: "info",
                timestamp: new Date().toISOString(),
                message: JSON.stringify(message)
            }]
        };
        logger.info(log);
    };

    console.warn = (message) => {
        const log = {
            ...meta,
            logs: [{
                event: "warn",
                timestamp: new Date().toISOString(),
                message: JSON.stringify(message)
            }]
        };
        logger.warn(log);
    };

    console.error = (message) => {
        const log = {
            ...meta,
            logs: [{
                event: "error",
                timestamp: new Date().toISOString(),
                message: JSON.stringify(message)
            }]
        };
        logger.error(log);
    }
};

module.exports = (req, res, next) => {
    const meta = getBasicLog(req);

    createConsoleLog(meta);

    next();
};
