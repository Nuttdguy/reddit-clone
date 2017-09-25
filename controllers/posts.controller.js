const PostModel = require('../model/posts.model');


exports.getHome = (req, res, next) => {
    PostModel.find().exec( (err, post) => {
        res.render('posts-index', { post: post });
    });
};

exports.createPost = (req, res, next) => {
    res.render('posts-new', {});
};

exports.postNew = (req, res, next) => {
    let post = new PostModel(req.body); // Instantiate a new post model

    post.save( (err, post) => {
        return res.redirect('/');
    });
};

exports.getPostById = (req, res, next) => {
    PostModel.findById(req.params.id).exec( (err, post) => {
        res.render('posts-show', { post });
    })
};




