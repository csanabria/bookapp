var 
  //include all
  createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  booksRouter = require('./routes/books'),
  jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
  router = express.Router();
  app = express(),
  User = require('./app/models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/oauth', router)
router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        const payload = {
          admin: user.admin 
        };
        var token = jwt.sign(payload, app.get('superSecret'), { expiresIn : '1h' });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Token attached with response.',
          token: token
        });
      }   

    }

  });
});

// route middleware to verify a token
app.use(function(req, res, next) {
  console.log("Validating token")
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers.token;
  console.log("token "+token)
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
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

app.use('/', indexRouter);
app.use('/books/', booksRouter);
app.use('/user/', usersRouter);
app.set('superSecret', 'jwt'); // secret variable

module.exports = app;
