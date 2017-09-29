const PostModel = require('../models/posts.model'),
    CommentModel = require('../models/comments.model');


exports.getHome = (req, res) => {
    let currentUser = req.user;

    PostModel.find().exec((err, posts) => {
        CommentModel.find().exec( (err, comments) => {
            res.render('posts-index', {
                posts: posts,
                comments: comments,
                currentUser: currentUser });
        });
    });
};

exports.createPost = (req, res) => {
    let currentUser = req.user;
    res.render('posts-new', { currentUser: currentUser });
};

exports.postNew = (req, res) => {
    newPost = new PostModel(req.body);
    newPost.save().then( post => {
        res.redirect('/');
    });
};

exports.getPostById = (req, res) => {
    let currentUser = req.user;
    PostModel.findById(req.params.id).populate('comment').exec((err, post) => {
        // console.log('This is GET POST BY ID');
        // console.log(post);
        res.render('posts-show', { post, currentUser });
    })
};

exports.getPostReddit = (req, res) => {
    let currentUser = req.user;
    PostModel.find( { subreddit: req.params.subreddit } )
        .exec( (err, posts) => {
            res.render('posts-index', { posts: posts, currentUser: currentUser });
        });
};


// exports.postReddit = (req, res) => {
//     PostModel.find( { subreddit: req.params.subreddit } )
//         .exec( (err, posts) => {
//         res.render('posts-index', { posts: posts });
//     });
// };

