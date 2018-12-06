const Post = require('../models/Post');

module.exports = {
    // Post Index
    async postIndex(req, res, next) {
        let post = await Post.find({});
        res.render('posts/index', {post: post});
    },
    // New Post
    postNew(req, res, next) {
        res.render('posts/new');
    },
    // Post Create
    async postCreate(req, res, next) {
        //use req.body to create new Post
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    // Post Show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', {post: post})
    },
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {post: post})
    },
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
        res.redirect(`/posts/${post.id}`);
    }, 
    async postDestroy(req, res, next) {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect("/posts");
    }
}