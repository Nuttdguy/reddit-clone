const CommentModel = require('../models/comments.model'),
    PostModel = require('../models/posts.model');


exports.newComment = (req, res) => {
    console.log(req.params.postId);
    PostModel.findById(req.params.postId).exec((err, post) => {
        // console.log(post);
        res.render('comments-new', { post });
    });
};


exports.createComment = (req, res) => {
    let comment = new CommentModel(req.body);
    let postId = extractPostId(req.originalUrl, 2);
    // console.log(comment._id + ' << comment ID');

    PostModel.findById(postId).exec( (err, post) => {
        comment.save( (err, comment) => {
            post.comment.unshift(comment);
            post.save();
            res.redirect(`/posts/` + post._id);
        });
    }).catch( (err) => {
        res.redirect('/');
    });
};

// db.students.update(
//     { name: "joe" },
//     { $push: { scores: { $each: [ 90, 92, 85 ] } } }
// )


function extractPostId(url, segmentPart) {
    urlParts = url.split('/');
    return urlParts[segmentPart];
}