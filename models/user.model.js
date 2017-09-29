const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

const UserSchema  = new Schema({
    createdAt:      { type: Date },
    updatedAt:      { type: Date },
    password:       { type: String, select: false },
    username:       { type: String, required: true }
});

// the hash is getting created
UserSchema.pre('save', function(next) {
    let now = new Date();
    this.updatedAt = now; // updates the time user was last updated

    if ( !this.createdAt ) {
        this.createdAt = now; // if createdAt date is NOT empty, create timestamp now
    }

    let user = this;
    if (!user.isModified('password')) { return next(); }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);

