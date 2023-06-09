const express = require('express');
const User = require('../model/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const router = express.Router();
const cors = require('./cors');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    err => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        passport.authenticate('local')(req, res, () => {  //passport.authenticate('local') returns a function
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      }
    }
  );
});
//   User.findOne({ username: req.body.username })
//   .then( user => {
//     if (user) {
//       const err = new Error(`User ${req.body.username} already taken!`);
//       err.status = 403;
//       return next(err)
//     } else {
//       User.create({
//         username: req.body.username,
//         password: req.body.password
//       })
//       .then(user => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({ status: 'Registration Successful!', user: user });
//       })
//       .catch(err => next(err));
//     }
//   })
// })


router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});


router.post('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;


module.exports = router;
