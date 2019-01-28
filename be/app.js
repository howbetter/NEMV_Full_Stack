var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var setRouter = require('./routes/set');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // windodws 와 linux 계열간에 경로 호환되게 해줌.

// 아래는 순서대로 처리됨.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/set', setRouter);

// 여기까지 경로 없으면 아래로 내려가서 에러 처리

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
  res.render('error');
});

module.exports = app;
