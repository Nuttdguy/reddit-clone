const CommentModel = require('../models/comments.model'),
    PostModel = require('../models/posts.model');


exports.newComment = (req, res) => {
    let postModel = new PostModel();

    let currentUser = req.user;
    PostModel.findById(req.params.postId).exec((err, post) => {

        CommentModel.find(post.comment.id).exec((err, comment) => {
            console.log('In new comment');
            res.render('comments-new',
                {post: post, currentUser: currentUser, comment: comment});
        });
    });
};

// '/comments/:postId/comments'
exports.createComment = (req, res) => {
    let currentUser = req.user;
    let comment = new CommentModel(req.body);
    comment.author = comment;

    comment.save(function (err, comment) {
        if (err) { console.log(err); return; }

        PostModel.findById(req.params.postId).exec((err, post) => {
            post.comment.unshift(comment);
            post.author = currentUser;

            console.log('In comment section');
            console.log(post);
            post.update(function(err) {
                res.redirect(`/posts/` + req.params.postId);
            });
        });

    }).catch((err) => {
        res.redirect('/');
    });
};

function extractPostId(url, segmentPart) {
    let urlParts = url.split('/');
    return urlParts[segmentPart];
}