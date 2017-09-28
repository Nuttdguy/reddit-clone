const UserModel = require('../models/user.model'),
    jwt = require('jsonwebtoken');

exports.getSignUp = (req, res) => {
    res.render('sign-up');
};

exports.signUp = (req, res, next) => {
    let user = new UserModel(req.body);

    user.save( (err) => {
        if (err) { return res.status(400).send({err: err })}

        let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true} );
        console.log(req.cookies);

        res.redirect('/');
    })
};

