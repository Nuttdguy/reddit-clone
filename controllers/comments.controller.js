const Comment = require('../models/comments.model');


exports.newComment = (req, res, next) => {
  return res.render('comments-new');
};


exports.saveComments = (req, res, next) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    comment.save( (err, comment) => {
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
    })

};