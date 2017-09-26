const PostModel = require('../models/posts.model');

module.exports = (res) => {

    return new PostModel({
        title: res.title,
        description: res.description,
        published: {
            type: res.type
        }
    });

};