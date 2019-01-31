var express = require('express');
var router = express.Router();
var createError = require('http-errors');


const us = [
  {
    name: "김씨",
    age: 22
  },
  {
    name: "이씨",
    age: 33
  }
];

/* GET users listing. */

router.get('/', function(req, res, next) {
  console.log(req.query)
  console.log(req.body)
  res.send({ users: us })
});

router.post('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'post ok' })
})

router.put('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'put ok' })
})

router.delete('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'delete ok' })
})



router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, 'there is no api like that'))
});

module.exports = router;
 