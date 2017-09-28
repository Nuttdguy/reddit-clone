const PostModel = require('../models/posts.model'),
    CommentModel = require('../models/comments.model');


exports.getHome = (req, res) => {
    PostModel.find().exec((err, posts) => {
        CommentModel.find().exec( (err, comments) => {
            res.render('posts-index', {
                posts: posts,
                comments: comments });
        });
    });
};

exports.createPost = (req, res) => {
    res.render('posts-new', {});
};

exports.postNew = (req, res) => {
    newPost = new PostModel(req.body);
    newPost.save().then( post => {
        res.redirect('/');
    });
};

exports.getPostById = (req, res) => {
    PostModel.findById(req.params.id).populate('comment').exec((err, post) => {
        console.log('This is GET POST BY ID');
        console.log(post);
        res.render('posts-show', {post});
    })
};

exports.getPostReddit = (req, res) => {
    PostModel.find( { subreddit: req.params.subreddit } )
        .exec( (err, posts) => {
            res.render('posts-index', { posts: posts });
        });
};


// exports.postReddit = (req, res) => {
//     PostModel.find( { subreddit: req.params.subreddit } )
//         .exec( (err, posts) => {
//         res.render('posts-index', { posts: posts });
//     });
// };

