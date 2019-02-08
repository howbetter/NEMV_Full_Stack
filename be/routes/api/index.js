var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* 미들웨어 */
router.all('*', function(req, res, next) {
  console.log(req.headers)
  if (req.path === '/xxx') return res.send({ status: 'OK' });
  next();
});

router.get('/hello', function(req, res, next) {
  res.send({ msg: 'hello', a: 1 });
});

router.use('/user', require('./user'));


router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, 'there is no api like that'));
});

module.exports = router;
