var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Site = require('../../../models/sites');

router.get('/', function(req, res, next) {
  Site.findOne()
    .then(r => {
      res.send({ success: true, d: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'api/page : there is no api like that'));
});

module.exports = router;
