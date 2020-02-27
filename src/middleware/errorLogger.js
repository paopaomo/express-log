const winston = require('winston');
const { getBasicLog } = require("../helper/log");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = (err, req, res, next) => {
    const meta = getBasicLog(req);

    meta.logs = [{
        event: 'error',
        timestamp: new Date().toISOString(),
        message: err.message,
        stack: err.stack
    }];

    logger.error(meta);

    next(err);
};
