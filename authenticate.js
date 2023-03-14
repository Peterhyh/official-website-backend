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

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            User.findOne({ _id: jwt_payload._id }, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', { session: false });