const Post = require('../models/Post');

module.exports = {
    // Post Index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', {posts: posts});
    },
    // New Post
    newPost(req, res, next) {
        res.render('posts/new');
    },
    // Post Create
    async createPost(req, res, next) {
        //use req.body to create new Post
        let post = await Post.create(req.body);
        res.redirect(`posts/${post.id}`);
    }
}