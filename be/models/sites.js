const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const siteSchema = new mongoose.Schema({
  // name은 url 등록하는 부분
  title: { type: String, default: '설정 안 됨' },
  // 페이지 접속 카운트
  copyright: { type: String, default: '등록필요' },
  // 권한 레벨
  theme: { type: Boolean, default: true }
})

const Site = mongoose.model('Site', siteSchema);


// Site.deleteMany()
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

// Site.create({ title: '설정 안 됨'});

Site.findOne({})
  .then(r => {
    if (!r) return Site.create({});
    return Promise.resolve(r);
  })
  .then(r => {
    if (r) console.log(`${r.title} created`);
  })
  .catch(e => {
    console.error(e.message);
  })

module.exports = Site;
