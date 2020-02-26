const express = require('express');
const userRouter = require('./user.router');

const router = express.Router();

router.get('/error', function(req, res, next) {
    return next(new Error("This is an error and it should be logged to the console"));
});

router.get('/', function(req, res) {
    res.write('This is a normal request, it should be logged to the console too');
    res.end();
});

router.use(userRouter);

module.exports = router;

