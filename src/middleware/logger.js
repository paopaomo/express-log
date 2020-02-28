const winston = require('winston');
const { getBasicLog, myFormat } = require("../helper/log");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: myFormat
});

module.exports = (req, res, next) => {
    const meta = getBasicLog(req);

    meta.logs = [{
        event: 'info',
        timestamp: new Date().toISOString(),
        message: {
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query
        }
    }];

    const end = res.end;

    res.end = (chunk, encoding) => {
        res.end = end;
        res.end(chunk, encoding);

        meta['http.status_code'] = res.statusCode;

        logger.info(meta);
    };

    next();
};
