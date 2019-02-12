var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.all('*', function(req, res, next) {
  if (req.user.lv) return res.send({ success: false, msg: '권한이 없습니다.'});
  next();
  //next(createError(404, 'there is no api like that'));
});

router.use('/user', require('./user'));
router.use('/page', require('./page'));
router.use('/site', require('./site'));

router.all('*', function(req, res, next) {
  next(createError(404, '/manage : there is no api like that!'));
})

module.exports = router;
