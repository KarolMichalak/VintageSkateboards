const User = require("../models/User");

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