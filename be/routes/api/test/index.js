var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.headers)
  res.send({ msg: 'hello', a: '괜찮아' })
});

router.get('/hello', function(req, res, next) {
  res.send({ msg: 'hello', a: 22 });
});

router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, 'there is no api like that'));
});

module.exports = router;