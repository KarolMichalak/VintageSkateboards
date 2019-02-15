const express = require('express');
const router = express.Router();
const multer = require('multer');
const { asyncErrorHandler, isLoggedIn, isAuthor } = require("../middleware/index");
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });
const { 
  postIndex,
  postNew, 
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDestroy,
  postEmailSend,
  postEmailForm
} = require("../controllers/posts");

/* GET posts index /posts */
router.get('/', asyncErrorHandler(postIndex) );

/* GET post new /posts/new */
router.get('/new', isLoggedIn, postNew);

/* POST post create /posts */
router.post('/', isLoggedIn, upload.array('images', 4), asyncErrorHandler(postCreate)); 
/* GET post show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow)); 
/* GET post edit /posts/:id/edit */
router.get('/:id/edit', isLoggedIn, asyncErrorHandler(isAuthor), postEdit); 

/* PUT post update /posts/:id */
router.put('/:id', isLoggedIn, asyncErrorHandler(isAuthor), upload.array('images', 4), asyncErrorHandler(postUpdate)); 

/* DELETE post destroy /posts/:id */
router.delete('/:id', isLoggedIn, asyncErrorHandler(isAuthor), postDestroy); 

router.get('/:id/sendEmail', isLoggedIn, postEmailForm)

router.post('/:id/sendEmail', isLoggedIn, postEmailSend)

module.exports = router;