const PostModel = require('../models/posts.model');


exports.getHome = (req, res) => {
    PostModel.find().exec((err, posts) => {
        res.render('posts-index', {posts: posts});
    });
};

exports.createPost = (req, res) => {
    res.render('posts-new', {});
};

exports.postNew = (req, res) => {
    let post = new PostModel(req.body); // Instantiate a new post model

    post.save((err, post) => {
        res.redirect('/');
    });
};

exports.getPostById = (req, res) => {
    PostModel.findById(req.params.id).exec((err, post) => {
        res.render('posts-show', {post});
    })
};

exports.getPostReddit = (req, res) => {
    // console.log(req.params.subreddit);
    PostModel.find( { subreddit: req.params.subreddit } )
        .exec( (err, posts) => {
            res.render('posts-index', { posts: posts });
        });
};

// add comment
exports.newComment = (req, res) => {
    res.redirect()
};

// save comment


// exports.postReddit = (req, res) => {
//     PostModel.find( { subreddit: req.params.subreddit } )
//         .exec( (err, posts) => {
//         res.render('posts-index', { posts: posts });
//     });
// };

