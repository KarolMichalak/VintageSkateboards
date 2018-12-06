const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware/index");
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
router.get('/new', postNew);

/* POST post create /posts */
router.post('/', asyncErrorHandler(postCreate)); 
/* GET post show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow)); 
/* GET post edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit)); 

/* PUT post update /posts/:id */
router.put('/:id', asyncErrorHandler(postUpdate)); 

/* DELETE post destroy /posts/:id */
router.delete('/:id', postDestroy); 

module.exports = router;