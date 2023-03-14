const passport = require('passport'); //middleware
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const iwt = require('jsonwebtoken');

const config = require('./config.js');


exports.local = passport.use(new LocalStrategy(User.authenticate())); //to add a specific strategy plugin that we want to use in our passport implementation.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = user => {
    return jwt.sign(user, config.secretKey, { expiresIn: 86400 });
};