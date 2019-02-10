var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var jwt = require('jsonwebtoken');
const cfg = require('../../../config/');



router.use('/sign', require('./sign'));

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err);
      resolve(v);
    })
  })
}

/* 미들웨어 */
router.all('*', function(req, res, next) {
  // token 검사
  const token = req.headers.authorization;
  console.log('token', token);
  verifyToken(token)
    .then(v => {
      console.log(v);
      next();
    })
    .catch(e => {
      res.send({ success: false, msg: e.message});
    })

  // console.log(req.headers)
  // if (req.path === '/xxx') return res.send({ status: 'OK' });
  // next();
});

router.get('/hello', function(req, res, next) {
  res.send({ msg: 'hello', a: 1 });
});

router.use('/user', require('./user'));
router.use('/test', require('./test'));

router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, 'there is no api like that'));
});

module.exports = router;
