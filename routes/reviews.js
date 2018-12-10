const express = require('express');
const router = express.Router({ mergeParams: true }); //mergeParams give acces to the route specified in app.use (app.js)
const { asyncErrorHandler } = require('../middleware/index');
const { reviewCreate,
        reviewUpdate,
        reviewDestroy
} = require('../controllers/reviews')

/* POST review create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate)); 

/* PUT review update /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
    res.send('UPDATE /posts/:id/reviews/:review_id');
  }); 

/* DELETE review destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) => {
    res.send('DESTROY /posts/:id/reviews/:review_id');
  }); 

module.exports = router;