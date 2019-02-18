/*var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../models/pages');

router.post('/', function(req, res, next) {
  const { name } = req.body;
  console.log('api/page : req.body, req.user.lv', req.body, req.user.lv);
  Page.findOne({ name })
    .then((r) => {
      console.log('api/page : r.lv, req.user', r.lv, req.user);
      if (!r) {
        if (req.user.lv) throw new Error (`페이지 ${name}를 생성할 수 없습니다.`); // req.user.lv > 0
        return Page.create({ name });
      }
      if (r.lv < req.user.lv) {
        throw new Error (`페이지_${name}에_대한_이용_자격이_없습니다.`);
      }
      return Page.updateOne({ _id: r._id }, { $inc: { inCnt: 1 } });
    })
    .then(() => {
      res.send({ success: true, d: req.user });
    })
    .catch((e) => {
      console.log('api/page : e.message', e.message);
      res.send({ success: false, msg: e.message });
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'api/page : there is no api like that'));
});

module.exports = router;*/


var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../models/pages');

router.post('/', function(req, res, next) {
  const { name } = req.body
  Page.findOne({ name })
    .then((r) => {
      if (!r) {
        if (req.user.lv) throw new Error(`페이지 ${name} 생성이 안되었습니다.`)
        return Page.create({ name })
      }
      if (r.lv < req.user.lv) throw new Error(`페이지 ${name} 이용 자격이 없습니다.`)
      return Page.updateOne({ _id: r._id }, { $inc: { inCnt: 1 } })
    })
    .then(() => {
      res.send({ success: true, d: req.user, token: req.token })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'api/page : there is no api like that'));
});

module.exports = router;
