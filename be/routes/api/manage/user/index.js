var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const User = require('../../../../models/users');

/* GET users listing. */

router.get('/', function(req, res, next) {
  // console.log(req.query)
  // console.log(req.body)
  //res.send({ users: us })
  User.find()
    .then(r => {
      res.send({ success: true, users: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

/*
router.post('/', (req, res, next) => {
  const { name, age } = req.body
  const u = new User({ name, age })
  u.save()
    .then(r => {
      res.send({ success: true, msg: r})
    })
    .catch(e => {
      res.send({ success: false, msg: e })
    })
})
*/

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  console.log(req.query)
  // console.log(req.body)
  // res.send({ success: true, msg: 'put ok' })
  User.updateOne({ _id: id }, { $set: req.body })
    .then(r => {
      res.send({ success: true, msg: r})
    })
    .catch(e => {
      res.send({ success: false, msg: e })
    })
}) 

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  console.log(req.query)
  // console.log(req.body)
  // res.send({ success: true, msg: 'delete ok' })
  User.deleteOne({ _id: id })
    .then(r => {
      res.send({ success: true, msg: r})
    })
    .catch(e => {
      res.send({ success: false, msg: e })
    })
})



router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, '/manage/user : there is no api like that'))
});

module.exports = router;
 