const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

const UserSchema  = new Schema({
    createdAt:      { type: Date },
    updatedAt:      { type: Date },
    password:       { type: String, select: false },
    username:       { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    let now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) { this.createdAt = now; }

    let user = this;
    // console.log(user);
    if (!user.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = (password, done) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);

