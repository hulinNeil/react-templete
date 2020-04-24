const express = require('express');
const router = express.Router();
const adminMenu = require('./config/admin');
const userMenu = require('./config/user');

router.get('/api/list', (req, res) => {
  res.send([
    { name: 'AA', age: 10 },
    { name: 'BB', age: 20 },
    { name: 'CC', age: 30 },
  ]);
});

router.post('/api/login', (req, res) => {
  const result = {
    status: 0,
    data: {
      _id: '12345',
      username: req.body.userName || 'none',
      createTime: 15546291355,
      permission: req.body.userName === 'admin' ? 1 : 0, // 1 为write权限，可以增删改，2为read，只能查看，不能进行其他操作
      menu: req.body.userName === 'admin' ? adminMenu : userMenu,
    },
  };
  setTimeout(() => {
    res.json(result);
  }, 1000);
});

// CommonJS规范
module.exports = router;
