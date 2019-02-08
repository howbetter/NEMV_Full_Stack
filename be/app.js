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

// User.create({ name: '사람2', age: 30 })

mongoose.connect('mongodb://localhost:27017/nemv', (err) => {
  if (err) return console.err(err);
  console.log('mongoose connected!');
//  User.find()
//    .then(r => console.log(r))
//    .catch(e => console.error(e))
//  User.deleteOne({ name: '이름테스트'})
//    .then(r => console.log(r))
//    .catch(e => console.error(e))
  // db 초기화
  User.deleteMany()
    .then(r => console.log(r))
    .catch(e => console.error(e))
});
console.log(process.env.NODE_ENV)
