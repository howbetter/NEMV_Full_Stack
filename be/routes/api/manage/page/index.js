var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const Page = require('../../../../models/pages');

router.get('/', function(req, res, next) {
  Page.find()
    .then(r => {
      res.send({ success: true, pages: r })
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

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  Page.updateOne({ _id }, { $set: req.body })
    .then(r => {
      res.send({ success: true, msg: r})
    })
    .catch(e => {
      res.send({ success: false, msg: e })
    })
}) 

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  Page.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r})
    })
    .catch(e => {
      res.send({ success: false, msg: e })
    })
})



router.all('*', function(req, res, next) {
  //res.send('this is api page');
  next(createError(404, '/manage/page : there is no api like that'))
});

module.exports = router;
 