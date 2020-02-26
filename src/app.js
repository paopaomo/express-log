const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const router = require('./router/index');

const app = express();

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    expressFormat: true,
    metaField: 'null',
    statusLevels: true
}));

app.use(router);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.listen('8080', () => {
    console.log('server 启动成功: http://127.0.0.1:8080');
});
