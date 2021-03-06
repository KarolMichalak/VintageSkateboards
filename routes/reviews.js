const express = require('express');
const router = express.Router({ mergeParams: true }); //mergeParams give acces to the route specified in app.use (app.js)
const { asyncErrorHandler, isReviewAuthor } = require('../middleware/index');
const { reviewCreate,
        reviewUpdate,
        reviewDestroy
} = require('../controllers/reviews')

/* POST review create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate)); 

/* PUT review update /posts/:id/reviews/:review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate)); 

/* DELETE review destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDestroy)); 

module.exports = router;