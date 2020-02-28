const express = require('express');
const models = require('../../db/models'); // 模型对象

const router = express.Router();

router.get('/create', async (req, res) => {
    const { name } = req.query;
    // promise -> sequlize 对象
    const user = await models.User.create({
        name
    });
    res.json({
        message: '创建成功',
        user
    });
});

router.get('/list', async (req, res) => {
    const list = await models.User.findAll();
    res.json(list);
});

router.get('/detail/:id', async (req, res) => {
    const { id } = req.params;
    const user = await models.User.findOne({
        where: { id }
    });
    res.json(user);
});

module.exports = router;
