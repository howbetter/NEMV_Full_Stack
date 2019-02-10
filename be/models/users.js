const mongoose = require('mongoose');
const cfg = require('../../config');

// index 추가하면 deprecationWarning 떠서 추가함. ensureIndex 대신 createIndexes 사용하게 함.
mongoose.set('userCreateIndex', true);


const userSchema = new mongoose.Schema({
  // name: { type: String, default: '', unique: true, index: true },
  // age: { type: Number, default: 1}
  name: { type: String, default: ''},
  age: { type: Number, defualt: 1 },
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: '' },
  retry: { type: Number, defualt: 0 }
})

const User = mongoose.model('User', userSchema);
// User.collection.dropIndexes({ name: 1 });


// cfg 파일에 정의된 admin 계정 정보를 찾음. 없으면 읽어서 새로 생성
User.findOne({ id: cfg.admin.id })
  .then((r) => {
    if (!r) return User.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name });
    return Promise.resolve(null);
  })
  .then( (r) => {
    if (r) console.log(`admin:${r.id} created!!`);
  })
  .catch((e) => {
    console.error(e.message);
  })


module.exports = User;

