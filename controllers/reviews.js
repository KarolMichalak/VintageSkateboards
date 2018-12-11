const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
    // Post Create
    async reviewCreate(req, res, next) {
        //find the post by its id
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        let haveReviewd = post.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length; // checks whether current user's id is the same as one of the author's ID in the found post review and stores it in haveReviews array
        if (haveReviewd) {
            req.session.error = "Sorry, you can only create one review"
            return res.redirect(`/posts/${post.id}`);
        }
        //create the review
        req.body.review.author = req.user._id
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
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review edited successfully';
        res.redirect(`/posts/${req.params.id}`);
    }, 
    async reviewDestroy(req, res, next) {
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: { reviews: req.params.review_id }
        });
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success = 'Review removed successfully';
        res.redirect(`/posts/${req.params.id}`);
    }
}