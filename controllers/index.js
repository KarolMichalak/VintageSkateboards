const User = require("../models/User");
const Post = require("../models/post");
const passport = require('passport');
const mapBoxToken = process.env.MAPBOX_TOKEN
const async         = require("async");
const nodemailer    = require("nodemailer");
const crypto        = require("crypto");

module.exports = {
	// GET /
	async landingPage(req, res, next) {
		const posts = await Post.find({});
		res.render('index', { posts, mapBoxToken, title: 'Surf Shop - Home' });
	},
	// GET /register
	getRegister(req, res, next) {
		res.render('register', { title: 'Register', username: '', email: '' });
	},
	// POST /register
	async postRegister(req, res, next) {
		try {
			const user = await User.register(new User(req.body), req.body.password);
			req.login(user, function(err) {
				if (err) return next(err);
				req.session.success = `Welcome to Surf Shop, ${user.username}!`;
				res.redirect('/');
			});
		} catch(err) {
			const { username, email } = req.body;
			let error = err.message;
			if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
				error = 'A user with the given email is already registered';
			}
			res.render('register', { title: 'Register', username, email, error });
		}
	},
	// GET /login
	getLogin(req, res, next) {
		if (req.isAuthenticated()) return res.redirect('/');
		if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
		res.render('login', { title: 'Login' });
	},
	// POST /login
	async postLogin(req, res, next) {
		const { username, password } = req.body;
		const { user, error } = await User.authenticate()(username, password);
		if (!user && error) return next(error);
		req.login(user, function(err) {
			if (err) return next(err);
			req.session.success = `Welcome back, ${username}!`;
			const redirectUrl = req.session.redirectTo || '/';
			delete req.session.redirectTo;
			res.redirect(redirectUrl);
		});
	},
	// GET /logout
	getLogout(req, res, next) {
	  req.logout();
	  res.redirect('/');
	},
	//GET /profile
	async getProfile(req, res, next) {
		const posts = await Post.find().where('author').equals(req.user._id).limit(10).exec();
		res.render('profile', { posts });
	},
	 // Show the form for the password reset
	 forgotPass (req, res){
		res.render('forgot');
	},
	// Password reset 
	resetPass (req, res, next) {
		async.waterfall([
		  function(done) {
			crypto.randomBytes(20, function(err, buf) {
			  var token = buf.toString('hex');
			  done(err, token);
			});
		  },
		  function(token, done) {
			User.findOne({ email: req.body.email }, function(err, user) {
			  if (err || !user) {
				req.session.error = "No account with given email exists."
				return res.redirect('/forgot');
			  }
			  user.resetPasswordToken = token;
			  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
			  user.save(function(err) {
				done(err, token, user);
			  });
			});
		  },
		  function(token, user, done) {
			var smtpTransport = nodemailer.createTransport({
			  service: 'Gmail', 
			  auth: {
				user: 'testwebappfordevelopment@gmail.com',
				pass: process.env.GMAILPW
			  }
			});
			var mailOptions = {
			  to: user.email,
			  from: 'testwebappfordevelopment@gmail.com',
			  subject: 'Vintage Skateboards password reset request',
			  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				'http://' + req.headers.host + '/reset/' + token + '\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
			  req.session.success = `An e-mail has been sent to  + ${user.email} +  with further instructions.`
			  done(err, 'done');
			});
		  }
		], function(err) {
		  if (err) return next(err);
		  res.redirect('/forgot');
		});
	  },
	// Creating token for the user
	resetGetToken (req, res) {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		  if (err || !user) {
			req.session.succes = 'Password reset token is invalid or has expired.'
			return res.redirect('/forgot');
		  }
		  res.render('reset', {token: req.params.token});
		});
	  },
	
	// Setting up new pasword
	resetPostToken (req, res) {
		async.waterfall([
		  function(done) {
			User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			  if (err || !user) {
				req.session.erro = 'Password reset token is invalid or has expired.'
				return res.redirect('back');
			  }
			  if(req.body.password === req.body.confirm) {
				user.setPassword(req.body.password, function(err) {
				  user.resetPasswordToken = undefined;
				  user.resetPasswordExpires = undefined;
	  
				  user.save(function(err) {
					req.logIn(user, function(err) {
					  done(err, user);
					});
				  });
				})
			  } else {
				  req.session.error = 'Passwords do not match.'
				  return res.redirect('back');
			  }
			});
		  },
		  function(user, done) {
			var smtpTransport = nodemailer.createTransport({
			  service: 'Gmail', 
			  auth: {
				user: 'testwebappfordevelopment@gmail.com',
				pass: process.env.GMAILPW
			  }
			});
			var mailOptions = {
			  to: user.email,
			  from: 'testwebappfordevelopment@gmail.com',
			  subject: 'Your password has been changed',
			  text: 'Hello,\n\n' +
				'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
			  req.session.success = 'Success! Your password has been changed.'
			  done(err);
			});
		  }
		], function(err) {
		  res.redirect('/');
		});
	  }
}

