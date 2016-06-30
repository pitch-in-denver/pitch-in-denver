var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
var auth = require('../auth');

// VOLUNTEER SIGNUP
router.get('/volsignup', function(req, res, next) {
  res.render('volsignup');
});

router.post('/volsignup', function(req, res, next){ // add auth.isLoggedIn,
  db.findUserByEmail(req.body.email).then(function(email){
    if (email) {
      res.render('volsignup', {error: 'Error: User already exists.'});
    } else {
      auth.createUser(req.body).then(function(id){    return knex('volunteer').insert({account_id:id[0]}).returning('account_id').then(function(id) {
        req.session.userId = id[0];
        console.log(id[0]);
        res.redirect('/profile/edit');
        })

      });
    }
  });
});

// COORDINATOR SIGNUP
router.get('/coorsignup', function(req, res, next) {
  res.render('coorsignup');
});

router.post('/coorsignup', function(req, res, next){
  db.findUserByEmail(req.body.email).then(function(email){
    if (email) {
      res.render('coorsignup', {error: 'Error: User already exists.'});
    } else {
      auth.createUser(req.body).then(function(id){
          req.session.userId = id[0];
          res.redirect('/profile');
          })
    }
  });
});

module.exports = router;
