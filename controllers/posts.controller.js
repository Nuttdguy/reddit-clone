const PostModel = require('../models/posts.model'),
    CommentModel = require('../models/comments.model'),
    UserModel = require('../models/user.model');


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
    // let newPost = new PostModel(req.body);
    let currentUser = req.user;
    UserModel.findById(req.user._id).exec(function (err, user) {
        let post = new PostModel(req.body);
        post.author = user; // add current user to post object
        console.log(post);

        post.save(function (err, post) {
            // REDIRECT TO THE NEW POST
            res.redirect('/posts/'+ post._id)
        });
    });

};

exports.getPostById = (req, res) => {
    let currentUser = req.user;
    PostModel.findById(req.params.id)
        .populate( { path: "comment.content", model: 'Comment'})
        .exec((err, post) => {
            console.log(post);
            if (err) return console.log(post);
            res.render('posts-show', { post: post, currentUser: currentUser });

    }).catch( (err) =>{
        console.log(err);
    });
};

exports.getPostReddit = (req, res) => {
    let currentUser = req.user;
    PostModel.find( { subreddit: req.params.subreddit } )
        .exec( (err, posts) => {
            res.render('posts-index', { posts: posts, currentUser: currentUser });
        });
};


