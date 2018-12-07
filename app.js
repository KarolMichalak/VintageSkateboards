require('dotenv').config();
const createError = require('http-errors'),
express           = require('express'),
path              = require('path'),
cookieParser      = require('cookie-parser'),
logger            = require('morgan'),
favicon           = require('favicon'),
bodyParser        = require('body-parser'),
passport          = require('passport'),
session           = require('express-session'),
mongoose          = require('mongoose'),
methodOverride    = require('method-override'),
User              = require('./models/User'),


//require routes
index             = require('./routes/index'),
posts             = require('./routes/posts'),
reviews           = require('./routes/reviews'),

app               = express();

// Connect to the database
mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// App configuration setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

//PASSPORT AND SESSIONS SETUP
app.use(session({
  secret: 'my beautiful secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting up routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

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

module.exports = app;
