require('dotenv').config();
const createError = require('http-errors'),
express           = require('express'),
engine            = require('ejs-mate'),
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
/* seedPosts         = require('./seeds');
seedPosts(); */


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

// use ejs-locals for all ejs templates
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup public assets directory
app.use(express.static('public'));

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


// Set local variables middleware
app.use(function(req, res, next) {
  req.user = {
    "_id": "5c0f8e289fbea5274cb0647b",
    "username": "dupsko",
  };
  res.locals.currentUser = req.user;
  // set deafult page title
  res.locals.title = "Skateboards Shop"
  // set succes flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  //set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  //continue on to the next function in middleware chain
  next();
})

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
/*   // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); */
  console.log(err);
  req.session.error = err.message;
  res.redirect("back");
});




module.exports = app;
