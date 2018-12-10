const express = require('express');
const router = express.Router({ mergeParams: true }); //mergeParams give acces to the route specified in app.use (app.js)

/* POST review create /posts/:id/reviews */
router.post('/', (req, res, next) => {
    res.send('CREATE /posts/:id/reviews');
  }); 

/* PUT review update /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
    res.send('UPDATE /posts/:id/reviews/:review_id');
  }); 

/* DELETE review destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) => {
    res.send('DESTROY /posts/:id/reviews/:review_id');
  }); 

module.exports = router;