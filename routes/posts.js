const express = require('express');
const router = express.Router();
const multer = require('multer');
const { asyncErrorHandler, isLoggedIn } = require("../middleware/index");
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });
const { 
  postIndex,
  postNew, 
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDestroy
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
router.get('/:id/edit', asyncErrorHandler(postEdit)); 

/* PUT post update /posts/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate)); 

/* DELETE post destroy /posts/:id */
router.delete('/:id', postDestroy); 

module.exports = router;