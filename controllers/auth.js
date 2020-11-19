const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
const expressJwt = require('express-jwt'); 
const { errorHandler } = require('../helpers/dbErrorHandler');

//signup
exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

//signin
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

//signout
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

//auth
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

//auth
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        //if not authenticated user
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

//if not dealer
exports.isDealer = (req, res, next) => {
    if (req.profile.role !== 0) {

        //if is Dealer
        return res.status(403).json({
            error: 'Dealer resourse! Access denied'
        });
    }
    next();
};

//if not admin
exports.isWebAdmin = (req, res, next) => {
    if (req.profile.role !== 1) {

        //if is admin
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};

