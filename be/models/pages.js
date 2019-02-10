const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const pageSchema = new mongoose.Schema({
  // name은 url 등록하는 부분
  name: { type: String, default: '', index: true },
  // 페이지 접속 카운트
  inCnt: { type: Number, default: 0 },
  // 권한 레벨
  lv: { type: Number, default: 0 }
})

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
