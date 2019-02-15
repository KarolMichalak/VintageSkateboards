const express = require('express');
const router = express.Router();
const {
  postRegister,
  postLogin,
  getLogout,
  landingPage,
  getRegister,
  getLogin,
  getProfile,
  resetGetToken,
  resetPostToken,
  resetPass,
  forgotPass
} = require('../controllers/index');
const {
  asyncErrorHandler,
  isLoggedIn
} = require('../middleware/index');


/* GET home page/Landing Page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register */
router.get('/register', getRegister);

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout);

/* GET /profile */
router.get('/profile/:id', isLoggedIn, asyncErrorHandler(getProfile));


/* GET /forgot */
router.get('/forgot', forgotPass);

/* PUT /forgot */
router.post('/forgot', resetPass);

/* GET /reset/:token */
router.get('/reset/:token', resetGetToken);

/* PUT /reset/:token */
router.post('/reset/:token', resetPostToken);


module.exports = router;