var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

// Populate profile data on profile page
router.get('/profile', function(req, res, next) {
  db.findUserById(req.session.userId).then(function (user) {
  if (db.isVolunteer(user.type)) {
    Promise.all([
      knex('account').where({id: req.session.userId}).first(),
      knex('volunteer')
        .select('volunteer_activity.activity')
        .join('volunteer_activity', function() {
          this.on('volunteer.activity_id', '=', 'volunteer_activity.id');
        })
        .where({account_id: req.session.userId})
        .first()
    ]).then(function(data) {
      var volunteer = db.isVolunteer(data[0].type);
      res.render('profile', {account: data[0], activities: data[1], volunteer: volunteer});
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    Promise.all([
      knex('account').where({id: req.session.userId}).first(),
      knex('coordinator')
        .select('coordinator.title')
        .join('account', function() {
          this.on('coordinator.account_id', '=', 'account.id');
        })
        .where({account_id: req.session.userId})
        .first()
        // add knex query for facilites associated with
    ]).then(function(data) {
      var volunteer = db.isVolunteer(data[0].type);
      res.render('profile', {account: data[0], title: data[1], volunteer: volunteer});
    }).catch(function (err) {
      console.log(err);
    });
  }
});

});

// Populate profile data on profile edit page
router.get('/profile/edit', function(req, res, next) {
  if (db.isVolunteer(req.session.userId)) {
    return Promise.all([
      knex('account').where({id: req.session.userId}).first(),
      knex('volunteer_activity').select()
    ]).then(function(data){
      console.log('profile-edit/vol data =', data);
      var volunteer = db.isVolunteer(data[0].type);
      console.log('volunteer?', volunteer);
      res.render('profile-edit', {account: data[0], activities: data[1], volunteer: volunteer});
    });
  } else {
    return Promise.all([
      knex('account').where({id: req.session.userId}).first(),
      knex('coordinator')
        .select('coordinator.title')
        .join('account', function() {
          this.on('coordinate.account_id', '=', 'account.id');
        })
        .where({account_id: req.session.userId})
        .first()
    ]).then(function(data){
      console.log('profile-edit/coord data =', data);
      var volunteer = db.isVolunteer(data[0].type);
      console.log('volunteer?', volunteer);
      res.render('profile-edit', {account: data[0], title: data[1], volunteer: volunteer});
    });
  }
});

// Edit/update blog post functionality
router.post('/profile/edit', function(req, res, next) {
  if (db.isVolunteer(req.session.userId)) {
    return Promise.all([
      knex('account').where({id: req.session.userId}).update({first_name: req.body.first_name, last_name: req.body.last_name, city: req.body.city, email: req.body.email, phone: req.body.phone, bio: req.body.bio}),
      // db.findUserInTable
      knex('volunteer').update({account_id: req.session.userId, activity_id: req.body.activity})
    ]).then(function () {
      res.redirect('/profile');
    });
  } else {
    return Promise.all([
      knex('account').where({id: req.session.userId}).update({first_name: req.body.first_name, last_name: req.body.last_name, city: req.body.city, email: req.body.email, phone: req.body.phone, bio: req.body.bio}),
      // knex.raw('INSERT INTO coordinator (a,b,c) values (?, ?, ?) ON DUPLICATE KEY UPDATE c=c+1', [1, 2, 3])
      knex('coordinator').insert({account_id: req.session.userId, title: req.body.title})
    ]).then(function () {
      res.redirect('/profile');
    });
  }
});

module.exports = router;
