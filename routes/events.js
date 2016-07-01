var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
var moment = require('moment');
var auth = require('../auth');

router.get('/events', auth.isNotLoggedIn, function(req, res, next) {
	db.isVolunteer(req.session.userId).then(function(isVolunteer) {
		if (isVolunteer) {
			return Promise.all([
				knex('event').select('event.title as title', 'event.id as id', 'event.address as address', 'event.details as details', 'event.date as date', 'event.start_time as start_time', 'event.end_time as end_time', 'event.description as description', 'volunteer_activity.activity')
				.join('volunteer_activity', function() {
					this.on('volunteer_activity.id', '=', 'event.activity_id');
				}),
				db.isVolunteer(req.session.userId)
			]).then(function(data) {
				console.log(data);
				res.render('events', {
					events: data[0],
					volunteer: data[1],
					id: req.session.userId
				});
			});
		} else {
			return Promise.all([
				knex('event').select('event.title as title', 'event.id as id', 'event.address as address', 'event.details as details', 'event.date as date', 'event.start_time as start_time', 'event.end_time as end_time', 'event.description as description', 'volunteer_activity.activity')
				.join('volunteer_activity', function() {
					this.on('volunteer_activity.id', '=', 'event.activity_id');
				})
				.where('event.account_id', '=', req.session.userId),
				db.isVolunteer(req.session.userId)
			]).then(function(data) {
				console.log(data);
				res.render('events', {
					events: data[0],
					volunteer: data[1],
					id: req.session.userId
				});
			});
		}
	});
});

router.get('/events/create', auth.isNotLoggedIn, function(req, res, next) {
	return Promise.all([
			db.isVolunteer(req.session.userId),
			knex('volunteer_activity').select()
		])
		.then(function(data) {
			res.render('createevent', {
				account_id: req.session.userId,
				volunteer: data[0],
				id: req.session.userId,
				activities: data[1]
			});
		});

});

router.post('/events/create', function(req, res, next) {
	return knex('event').insert(req.body).then(function() {
		res.redirect('/events');
	});
});

router.get('/events/:id', auth.isNotLoggedIn, function(req, res, next) {
	return Promise.all([
		knex('event').select().where({
			id: req.params.id
		}).first(),
		knex('event')
		.select('account.first_name', 'account.last_name', 'account.email')
		.join('vol_event', function() {
			this.on('vol_event.event_id', '=', 'event.id');
		})
		.join('account', function() {
			this.on('account.id', '=', 'vol_event.account_id');
		})
		.where({
			event_id: req.params.id
		}),
		knex('event').select()
		.join('volunteer_activity', function() {
			this.on('volunteer_activity.id', '=', 'event.activity_id');
		})
		.where('event.id', '=', req.params.id),
		db.isVolunteer(req.session.userId)
	]).then(function(data) {
		res.render('event-detail', {
			event: data[0],
			volunteers: data[1],
			picture: data[2][0],
			volunteer: data[3],
			id: req.session.userId
		});
	}).catch(function(error) {
		console.log(error);
	});
});

//
router.get('/events/:id/volunteer', auth.isNotLoggedIn, function(req, res, next) {
	return knex('vol_event').insert({
		account_id: req.session.userId,
		event_id: req.params.id
	}).then(function() {
		res.redirect('/events');
	}).catch(function(error) {
		console.log(error);
		next(error);
	});
});

router.get('/events/:id/delete', function(req, res, next) {
  knex('vol_event').where({event_id: req.params.id}).del().then(function() {
    knex('event').where({id: req.params.id}).del().then(function() {
      res.redirect('/events');
    });
  }).catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
