var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET users listing. */

router.get('/', function(req, res, next) {
  const us = [
    {
      name: "김씨",
      age: 22
    },
    {
      name: "이씨",
      age: 33
    }
  ]
  res.send({
    users: us
  })
});



router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, 'there is no api like that'));
});

module.exports = router;
 