const express = require('express');
const router = express.Router();
const { errorHandler } = require("../middleware/index");
const { 
  getPosts,
  newPost, 
  createPost 
} = require("../controllers/posts");

/* GET posts index /posts */
router.get('/', errorHandler(getPosts) );

/* GET post new /posts/new */
router.get('/new', newPost);

/* POST post create /posts */
router.post('/', errorHandler(createPost)); 
/* GET post show /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send('SHOW /posts/:id');
  }); 
/* GET post edit /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/edit');
  }); 

/* PUT post update /posts/:id */
router.put('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id');
  }); 

/* DELETE post destroy /posts/:id */
router.delete('/:id', (req, res, next) => {
    res.send('DESTROY /posts/:id');
  }); 

module.exports = router;