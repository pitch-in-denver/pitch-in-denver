var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var moment = require('moment');

router.get('/events', function (req, res, next) {
  return knex('event').select().then(function (data) {
    res.render('events', {events: data, id: req.session.userId});
  });
});

router.get('/events/create', function(req, res, next) {
    // console.log(req.session.userId);
    res.render('createevent', {account_id: req.session.userId});
});

router.post('/events/create', function(req, res, next) {
  return knex('event').insert(req.body).then(function () {
    res.redirect('/events');
  });
});
    // db.findUserById(req.session.userId).then(function (user) {
    // if (db.isVolunteer(user.type)) {
    //
    //   Promise.all([
    //     knex('account').where({id: req.session.userId}).first(),
    //     knex('volunteer')
    //       .select('volunteer_activity.activity')
    //       .join('volunteer_activity', function() {
    //         this.on('volunteer.activity_id', '=', 'volunteer_activity.id');
    //       })
    //       .where({account_id: req.session.userId})
    //       .first()
    //   ]).then(function(data) {
    //     var volunteer = db.isVolunteer(data[0].type);
    //     res.render('profile', {account: data[0], activities: data[1], volunteer: volunteer});
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    //
    // } else {
    //
    // }

    router.get('/events/:id', function (req, res, next) {
      return Promise.all([
        knex('event').select().where({id: req.params.id}).first(),
        knex('event')
          .select('account.first_name', 'account.last_name')
          .join('vol_event', function() {
            this.on('vol_event.event_id', '=', 'event.id');
          })
          .join('account', function() {
            this.on('account.id', '=', 'vol_event.account_id');
          })
          .where({event_id: req.params.id})
          // .where('event.id', "=", "vol_event.event_id")
      ]).then(function (data) {
        console.log('data1=', data[1]);
        res.render('event-detail', {event: data[0], volunteers: data[1], id: req.session.userId});
      });
    });



//
router.get('/events/:id/volunteer', function(req, res, next) {
  console.log('req.params.id', req.params.id);
  return knex('vol_event').insert({account_id: req.session.userId, event_id: req.params.id}).then(function () {
    res.redirect('/events');
  }).catch(function(error) {
    console.log(error);
    next(error);
  });
});

module.exports = router;
