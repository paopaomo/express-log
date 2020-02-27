const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const consoleLog = (meta) => {
    console.log = console.info = (message) => {
        const log = {
            ...meta,
            logs: [{
                event: "info",
                timestamp: new Date().toISOString(),
                message
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
                message
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
                message
            }]
        };
        logger.error(log);
    }
};

module.exports = (req, res, next) => {
    const meta = {};

    meta.startTime = new Date().toISOString();
    meta['span.kind'] = 'server';
    meta['http.url'] = req.originalUrl || req.url;
    meta['http.method'] = req.method;
    meta.component = 'node-express';
    meta['sampler.type'] = 'const';
    meta['sampler.param'] = 'true';
    meta['internal.span.format'] = 'proto';
    meta.process = {
        processID: process.pid,
        hostname: process.env.USER,
        ip: req.hostname
    };
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

    consoleLog(meta);

    next();
};
