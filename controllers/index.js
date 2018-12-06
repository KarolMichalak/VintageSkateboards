const User = require("../models/User");
const passport = require('passport');

module.exports = {
    // POST /register
    async postRegister(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
        await User.register(newUser, req.body.password);
        res.redirect("/");
    },
    // POST /login
    postLogin(req, res, next) {
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login'
          })(req, res, next);
    },
    // GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
    }
};


/*
module.exports = {
    postRegister (req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            iamge: req.body.image
        });
        User.register(newUser, req.body.password, (err) => {
            if (err) {
                console.log('error while user register!', err);
                return next(err);
            }
            console.log('user registered!');
            res.redirect('/');
        });
    }
};
*/
