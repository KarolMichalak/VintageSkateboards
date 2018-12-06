const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware/index");
const { 
  postIndex,
  postNew, 
  postCreate,
  postShow,
  postEdit
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
router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id');
  }); 

/* DELETE post destroy /posts/:id */
router.delete('/:id', (req, res, next) => {
    res.send('DESTROY /posts/:id');
  }); 

module.exports = router;