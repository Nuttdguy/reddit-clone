const UserModel = require('../models/user.model'),
    jwt = require('jsonwebtoken');

exports.getSignUp = (req, res) => {
    let currentUser = req.user;
    if (req.cookies.nToken) {
        return res.status(304).redirect('/');
    }
    res.render('sign-up', { currentUser: currentUser });
};

exports.signUp = (req, res) => {
    let userModel = new UserModel(req.body);

    userModel.save(function (err) {
        if (err) { return res.status(400).send({ err: err }) }

        let token = jwt.sign({ _id: userModel._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

        res.redirect('/');
    })

};

exports.logOut = (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    UserModel.findOne( { username: req.body.username }, "+password", function(err, user) {
        console.log(user);
        if (!user) { return res.status(401).send({message: 'Wrong username or password'}); }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Wrong username or password'});
            }
        });

        let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days'});

        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

        res.redirect('/');
    })
};






