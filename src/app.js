const express = require('express');

const app = express();

app.listen('8080', () => {
    console.log('server 启动成功: http://127.0.0.1:8080');
});
