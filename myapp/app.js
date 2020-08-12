var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./db');
var bodyparser = require("body-parser");
var flash = require("connect-flash");
var passport = require("passport");
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//join
var joinRouter = require('./routes/join/joinrouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//join
app.use('/join',joinRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//model
var User = require('./models/user');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//session
app.use(cookieParser());
app.use(session({
  secret:"alefjalkefhkef",
  resave:true,
  saveUninitialized:true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


module.exports = app;
