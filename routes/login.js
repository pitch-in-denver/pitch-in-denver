var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var auth = require('../auth');

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  auth.passport.authenticate('local', function(error, user, info){
    if(error){
      res.render('login', {error: error});
    } else if (user){
      req.session.userId = user.id;
      res.redirect('/profile');
    }
  })(req, res, next);
});

router.get('/login/logout', function(req, res, next){
  req.session = null;
  res.redirect('/');
}); // requires Logout button in profile

module.exports = router;
