var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const lekarzRouter = require('./routes/lekarzRoute');
const klinikaRouter = require('./routes/klinikaRoute');
const zatrudnienieRouter = require('./routes/zatrudnienieRoute');
const lekarzApiRouter = require('./routes/api/LekarzeApiRoute');
const klinikaApiRouter = require('./routes/api/KlinikaApiRoute');
const zatrudnienieApiRouter = require('./routes/api/ZatrudnienieApiRoute');

const sequelizeInit = require('./config/sequelize/init');

sequelizeInit()
    .catch( err => {
      console.log(err);
    });
var app = express();
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lekarz', lekarzRouter);
app.use('/klinika', klinikaRouter);
app.use('/zatrudnienie', zatrudnienieRouter);

app.use('/api/lekarze', lekarzApiRouter);
app.use('/api/klinika', klinikaApiRouter);
app.use('/api/zatrudnienie', zatrudnienieApiRouter);
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
  res.status(err.status || 500)
  res.render('error');
});

module.exports = app;
