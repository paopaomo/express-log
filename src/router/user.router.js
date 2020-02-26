const express = require('express');

const router = express.Router();

router.use('/user', (req, res) => {
    res.json({
        name: 'Zi Ye'
    });
});

module.exports = router;
