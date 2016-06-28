var db = require('./db/api');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(function(email, password, done) {
  // console.log('logging in');
  db.findUserByEmail(email).then(function(email) {
    // console.log('after finding user', err, user);
    console.log(email);
    if (!email) {
      done("Error: User does not exist.", null);
    } else if (email && bcrypt.compareSync(password, user.password)) {
      done(null, email); // null because 1st arg is error msg
    } else {
      done("Error: Password is incorrect.");
    }
  });
}));

module.exports = {
  passport: passport,
  createUser: function(body) {
    var hash = bcrypt.hashSync(body.password, 8); // hash password
    body.password = hash;
    return db.findIdByType(body.type)
    .then(function (type){
      console.log('body = ', body);
      return db.addAccount(body, type);
    }).then(function (id){
      var acctId = id;
      console.log('hash = ', body.password);
      return db.addLocal(id, body.password);
    });
  },
  isLoggedIn: function(req, res, next) {
    if (req.session.userId) {
      res.redirect('/profile');
    } else {
      next();
    }
  },
  isNotLoggedIn: function(req, res, next) {
    if (!req.session.userId) {
      res.redirect('/');
    } else {
      next();
    }
  },
};
