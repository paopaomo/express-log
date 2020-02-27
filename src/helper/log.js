const getBasicLog = (req) => {
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

    return meta;
};

module.exports = { getBasicLog };
