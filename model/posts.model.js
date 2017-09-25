
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const PostSchema = new Schema({
    createdAt:      { type: Date },
    updatedAt:      { type: Date },
    title:          { type: String, required: true },
    url:            { type: String, required: true },
    summary:        { type: String, required: true }
});

PostSchema.pre('save', (next) => {
    let now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('PostModel', PostSchema);