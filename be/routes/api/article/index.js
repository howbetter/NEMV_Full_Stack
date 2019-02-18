var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')


router.post('/:_board', (req, res, next) => {
  const _board = req.params.name;
  if (!_board) return res.send({ success: false, msg: '게시판을 지정해 주세요' });
  const { title, content } = req.body;
  Board.findOne({ _id: _board })
    .then(r => {
      if (!r) throw new Error('게시판 없음');
      if (r.lv < req.user.lv) throw new Error('게시판 이용 권한이 없습니다');
      const atc = {
        title: title,
        content,
        _board,
        ip: req.ip,
        _user: null
      }
      if (req.user._id) atc._user = req.user._id;
      return Article.create(atc);
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.get('/:_board', (req, res, next) => {
  const _board = req.params._board;
  Article.find({ _board }).populate('_user', '-pwd')
  .then(r => {
    res.send({ success: true, ds: rs, token: req.token })
  })
  .catch(e => {
    res.send({ success: false, msg: e.message })
  })
});
// 수정은 아티클의 아이디만 있으면 된다.
router.put('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '게시물을 수정할 권한이 없습니다.' });
  const _id = req.params._id;
  Article.findById(_id)
  .then(r => {
    if (!r) throw new Error('게시물이 존재하지 않습니다.')
    if (r._user.toString() !== req.user._id) throw new Error('본인이 작성한 게시물이 아닙니다') // 원래는 코드명으로 해야 좋음.
    return Article.findOneAndUpdate({ _id }, { $set: req.body}, { new: true }) // find후 update하고 new를 true로 하면 변경된 결과가 출력됨
  })
  .then(r => {
    res.send({ success: true, ds: rs, token: req.token })
  })
  .catch(e => {
    res.send({ success: false, msg: e.message })
  })
});

router.delete('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '손님은 게시물을 삭제할 권한이 없습니다.' });
  const _id = req.params._id;
  Article.findById(_id).populate('user','lv')
  .then(r => {
    if (!r) throw new Error('게시물이 존재하지 않습니다.')
    if (r._user){ // 손님이 쓴 경우
      if (r._user.toString() !== req.user._id) {
        if (r._user.lv < req.user.lv) throw new Error('게시물을 삭제할 권한이 없습니다.')
      }
    }
    return Article.deleteOne({ _id }) // find후 update하고 new를 true로 하면 변경된 결과가 출력됨
  })
  .then(r => {
    res.send({ success: true, token: req.token })
  })
  .catch(e => {
    res.send({ success: false, msg: e.message })
  })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'api/article : there is no api like that'));
});

module.exports = router;
