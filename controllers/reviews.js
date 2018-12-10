const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
    // Post Create
    async reviewCreate(req, res, next) {
        //find the post by its id
        let post = await Post.findById(req.params.id);
        //create the review
        //req.body.review.author = req.user._id
        let review = await Review.create(req.body.review);
        //asign review to post
        post.reviews.push(review);
        //save the post
        post.save();
        //redirect to the post
        req.session.success = "Review created successfully"
        res.redirect(`/posts/${post.id}`);
    },
    async reviewUpdate(req, res, next) {
    }, 
    async reviewDestroy(req, res, next) {
    }
}