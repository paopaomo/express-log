const express = require('express');
const router = require('./router/index');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

app.use(router);

app.listen('8080', () => {
    console.log('server 启动成功: http://127.0.0.1:8080');
});
