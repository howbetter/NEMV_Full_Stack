const mongoose = require('mongoose');
const crypto = require('crypto');
const cfg = require('../../config');

// index 추가하면 deprecationWarning 떠서 추가함. ensureIndex 대신 createIndexes 사용하게 함.
mongoose.set('userCreateIndex', true);

const userSchema = new mongoose.Schema({
  name: { type: String, default: ''},
  age: { type: Number, defualt: 1 },
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: '' },
  lv: { type: Number, default: 2 },
  inCnt: { type: Number, default: 0 },
  retry: { type: Number, defualt: 0 }
})

const User = mongoose.model('User', userSchema);
// User.collection.dropIndexes({ name: 1 });

// 사용자 초기화
// User.deleteMany()
//   .then(r => console.log(r))
//   .catch(e => console.error(e))


// cfg 파일에 정의된 admin 계정 정보를 찾음. 없으면 읽어서 새로 생성
User.findOne({ id: cfg.admin.id })
  .then((r) => {
    if (!r) {
      console.log('최초생성');
      return User.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name, lv: 0 });
    }
    return Promise.resolve(r);
  })
  .then((r) => {
    if (r.pwd !== cfg.admin.pwd) {
      return Promise.resolve(null); // 비밀번호가 바뀌어 있으면 null 보내고 통과
    }
    console.log(`admin:${r.id} created!`);
    const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex');
    return User.updateOne({ _id: r._id }, { $set: { pwd } });
  })
  .then((r) => {
    if (r) console.log('password encrypted');
  })
  .catch((e) => {
    console.error(e.message);
  })

module.exports = User;

