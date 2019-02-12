var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var jwt = require('jsonwebtoken');
const cfg = require('../../../config/');

router.use('/site', require('./site'));
router.use('/sign', require('./sign'));

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 });
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰입니다.'));
    // null 걸러내기
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 });
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err);
      resolve(v);
    })
  })
}

/* 미들웨어 */
router.all('*', function(req, res, next) {
  // token 검사
  const token = req.headers.authorization; // string 타입으로 'null'이 들어옴
  console.log('main routes/ token : ', token);
  verifyToken(token)
    .then(v => {
      console.log('main routes/ v: ', v);
      req.user = v;
      next();
    })
    .catch(e => {
      res.send({ success: false, msg: e.message});
    })
});

router.use('/page', require('./page'));
router.use('/manage', require('./manage'));

// router.use('/user', require('./user'));

router.all('*', function(req, res, next) {
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.'});
  next();
  //next(createError(404, 'there is no api like that'));
});

router.use('/test', require('./test'));

module.exports = router;
