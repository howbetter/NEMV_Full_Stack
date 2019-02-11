var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../../models/users');

router.get('/', function(req, res, next) {
  User.find()
    .then(r => {
      res.send({ success: true, users: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  console.log('api/manage/user req.body: ', req.body)
  User.updateOne({ _id }, { $set: req.body})
    .then(r => {
      console.log('api/manage/user r: ', r)
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  User.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})


router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, '/manage/user : there is no api like that'))
});

module.exports = router;
 