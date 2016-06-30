var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
var moment = require('moment');
var auth = require('../auth')

router.get('/events', auth.isNotLoggedIn, function (req, res, next) {
  return Promise.all([
    knex('event').select()
    .join('volunteer_activity', function() {
      this.on('volunteer_activity.id', '=', 'event.activity_id')
    }),
    db.isVolunteer(req.session.userId)
  ]).then(function(data) {
    console.log(data)
    res.render('events', {events: data[0], volunteer: data[1], id: req.session.userId});
  });
});

router.get('/events/create', auth.isNotLoggedIn, function(req, res, next) {
  return Promise.all([
    db.isVolunteer(req.session.userId),
    knex('volunteer_activity').select()
  ])
  .then(function (data) {
    console.log(data);
    res.render('createevent', {account_id: req.session.userId, volunteer:data[0], id: req.session.userId, activities:data[1]});
  });

});

router.post('/events/create', function(req, res, next) {
  return knex('event').insert(req.body).then(function () {
    res.redirect('/events');
  });
});

router.get('/events/:id', auth.isNotLoggedIn, function (req, res, next) {
  return Promise.all([
    knex('event').select().where({id: req.params.id}).first(),
    knex('event')
      .select('account.first_name', 'account.last_name','account.email')
      .join('vol_event', function() {
        this.on('vol_event.event_id', '=', 'event.id');
      })
      .join('account', function() {
        this.on('account.id', '=', 'vol_event.account_id');
      })
      .where({event_id: req.params.id}),
      db.isVolunteer(req.session.userId)
  ]).then(function (data) {
    console.log('data1=', data[1]);
    res.render('event-detail', {event: data[0], volunteers: data[1], volunteer: data[2], id: req.session.userId});
  });
});

//
router.get('/events/:id/volunteer', auth.isNotLoggedIn, function(req, res, next) {
  console.log('req.params.id', req.params.id);
  return knex('vol_event').insert({account_id: req.session.userId, event_id: req.params.id}).then(function () {
    res.redirect('/events');
  }).catch(function(error) {
    console.log(error);
    next(error);
  });
});

module.exports = router;
