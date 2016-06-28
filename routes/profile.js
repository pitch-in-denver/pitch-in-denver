var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// Populate profile data on profile page
router.get('/profile', function(req, res, next) {
  knex('account').where({id: req.session.userId}).first().then(function(data) {
    res.render('profile', {account: data});
  });
});

// Populate profile data on profile edit page
router.get('/profile/edit', function(req, res, next) {
  knex('account').where({id: req.session.userId}).first().then(function(data) {
    res.render('edit', {account: data});
  });
});

// Edit/update blog post functionality
router.post('/profile/edit', function(req, res, next) {
  knex('post').where({id: req.session.userId}).update(req.body).then(function () {
    res.redirect('/profile');
  });
});



module.exports = router;
