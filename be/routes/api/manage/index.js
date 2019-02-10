var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/page', require('./page'));

router.all('*', function(req, res, next) {
  next(createError(404, '/manage : there is no api like that!'));
})

module.exports = router;
