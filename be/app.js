var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// history 기능 추가 : 참고 https://github.com/bripkens/connect-history-api-fallback
const history = require('connect-history-api-fallback');
// CORS 추가 Access-Control-Allow-Origin 문제 해결
const cors = require('cors');

var app = express();

// view는 사용하지 않을 것. front 부분은 vue 사용
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// dev 모드일 때 CORS 사용
if(process.env.NODE_ENV !== 'production') app.use(cors());

app.use('/api', require('./routes/api')); // 최우선 적용
app.use(history()); // history 적용
//app.use(express.static(path.join(__dirname, 'public'))); // windodws 와 linux 계열간에 경로 호환되게 해줌.
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));
 
// 아래는 순서대로 처리됨.
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/set', setRouter);

// 여기까지 경로에 페이지 없으면 아래로 내려가서 404 에러 처리

// catch 404 and forward to error handler
app.use(function(req, res, next) { // next는 다음으로 보내줌.
  next(createError(404));
});

// error handler 없는 페이지 처리
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  // render 하지 말고 화면에 에러 출력
  res.send({ msg: err.message});
});

module.exports = app;

const mongoose = require('mongoose');
const User = require('./models/users');
const cfg = require('../config/')
console.log(cfg)

mongoose.connect(cfg.dbUrl, (err) => {
  if (err) return console.err(err);
  console.log('mongoose connected!');
  // db 초기화
  // User.deleteMany()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))
});
console.log(process.env.NODE_ENV)
// var jwt = require('jsonwebtoken');
// const key = 'very very strong key';
// var token = jwt.sign({ id: 'admin', email: 'admin@admin.com' }, key);
// console.log(token);

// // verify a token symmetric - synchronous
// var decoded = jwt.verify(token, key);
// console.log(decoded);
// // { id: 'admin', email: 'admin@admin.com', iat: 1549613734 }
// console.log(new Date(decoded.iat * 1000)) // iat는 시간정보

// callback
// User.findOne({}, (err, r ) => {
//   if (err) return console.error(err);
//   console.log(r);
// })
// // promise
// User.findOne({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err));

// // callback function example
// const foo = (v, cb) => {
//   if (v > 1) return cb(new Error('abcd'));
//   setTimeout(() => {
//     cb(null, v + 1)
//   }, 3000)
// }

// foo(1, (err, r) => {
//   if (err) return console.error(err.message);
//   console.log(r);
// })

// User.findOne({ name: 'aaa' }, (err, u) => {
//   if (err) return console.error(err.message);
//   if (!u) {
//     console.log(u) // null
//     User.create({ name: 'aaa', age: 10 }, (err, cu) => {
//       if (err) return console.error(err.message);
//       console.log(cu);
//       jwt.sign({ name: 'aaa', age: cu.age }, key, (err, token) => {
//         if (err) return console.error(err.message);
//         console.log(token);
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message);
//           console.log(v); // { name: 'aaa', age: .............. }
//         })
//       })
//     })
//   }
//   else {
//     console.log(u) // { name: 'aaa' ..... }
//     const user = u;
//     User.updateOne({ _id: u._id }, { $inc: { age: 1 }}, (err, ur) => {
//       if (err) return console.error(err.message);
//       console.log(ur);
//       jwt.sign({ name: user.name, age: user.age + 1 }, key, (err, token) => {
//         if (err) return console.error(err.message);
//         console.log(token)
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message);
//           console.log(v) // { name: 'aaa' ..... }
//         })
//       })
//     })
//   }
// })

// async & await example
// const getToken = async (name) => {
//   let u = await User.findOne({ name }); // name: name을 축약하고 await로 기다려 준다.
//   if (!u) u = await User.create({ name, age: 10 }); // 만들어주고 u를 갱신함
//   if (u.age > 12) throw new Error(`$(u.age)는 나이가 너무 많습니다.`);
//   const ur = await User.updateOne({ id: _id}, { $inc: { age: 1 }}); // age를 증가시키고 ur에 결과 저장
//   if (!ur.nModified) throw new Error('수정된 것이 없습니다.'); // 수정된 값이 없다면 에러와 함께 내보냄
//   u = await User.findOne({ id: _id });  // age 가 증가된 것으로 갱신함
//   const token = await signToken(u, key);  // 받아 두었던 u로 토큰 생성
//   const v = await verifyToken(token, key);
//   return v;
// }

// getToken('aaa')
//   .then(v => console.log(v))
//   .catch(err => console.error(err.message));

  







