var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

// Populate profile data on profile page
router.get('/profile', function(req, res, next) {
  return Promise.all([
    knex('account').where({id: req.session.userId}).first(),
    knex('volunteer')
      .select('volunteer_activity.activity')
      .join('volunteer_activity', function() {
        this.on('volunteer.activity_id', '=', 'volunteer_activity.id');
      })
      .where({account_id: req.session.userId})
      .first()
    // knex('coordinator')
    //   .select('coordinator.title')
    //   .join('account', function() {
    //     this.on('coordinate.account_id', '=', 'account.id');
    //   })
    //   .where({account_id: req.session.userId})
    //   .first()
  ]).then(function(data) {
    var volunteer = db.isVolunteer(data.type);
    // console.log(data[2]);
    res.render('profile', {account: data[0], activities: data[1], volunteer: volunteer});
  });
});

// Populate profile data on profile edit page
router.get('/profile/edit', function(req, res, next) {
  return Promise.all([
    knex('account').where({id: req.session.userId}).first(),
    knex('volunteer_activity').select()
  ]).then(function(data){
    console.log(data);
    var volunteer = db.isVolunteer(data.type);
    res.render('profile-edit', {account: data[0], activities: data[1], volunteer: volunteer});
  });
});

// Edit/update blog post functionality
router.post('/profile/edit', function(req, res, next) {
  console.log('req.body = ', req.body);
  return Promise.all([
    knex('account').where({id: req.session.userId}).update({first_name: req.body.first_name, last_name: req.body.last_name, city: req.body.city, email: req.body.email, phone: req.body.phone, bio: req.body.bio}),
    knex('volunteer').update({account_id: req.session.userId, activity_id: req.body.activity})
  ]).then(function () {
    res.redirect('/profile');
  });
});



module.exports = router;
