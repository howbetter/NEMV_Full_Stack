var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');
const crypto = require('crypto');

router.post('/', (req, res) => {
  const u = req.body;
  if (!u.id) return res.send({ success: false, msg: '아이디가 없습니다.'});
  if (!u.pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.'});
  if (!u.name) return res.send({ success: false, msg: '이름이 없습니다.'});

  User.findOne({ id: u.id })
    .then((r) => {
      console.log('api/registser r : ', r);
      if (r) throw new Error('이미 가입된 아이디입니다.');
      return User.create(u);
    })
    .then((r) => {
      // Using a custom N parameter. Must be a power of two.
      const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex');
      return User.updateOne({ id: r._id }, { $set: { pwd } });
    })
    .then((r) => {
      res.send({ success: true, token: r });
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message });
    })
})

router.post('/out', (req, res) => {
  res.send({ success: false, msg: '아직 준비 안 됨'});
})

router.all('*', function(req, res, next) {
  next(createError(404, 'sign에 그런 api 없음'));
})

module.exports = router;
