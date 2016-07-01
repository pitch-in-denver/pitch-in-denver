var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

// Populate profile data on profile page
router.get('/profile', function(req, res, next) {
	db.isVolunteer(req.session.userId).then(function(isVolunteer) {
		if (isVolunteer) {
			Promise.all([
				knex('account').where({id: req.session.userId}).first(),
				knex('volunteer')
					.select('volunteer_activity.activity')
					.join('volunteer_activity', function() {
						this.on('volunteer.activity_id', '=', 'volunteer_activity.id');
					})
					.where({account_id: req.session.userId})
					.first(),
				db.isVolunteer(req.session.userId),
				knex('event')
					.select('event.title as title', 'event.id as id', 'event.date as date')
					.join('vol_event', function() {
						this.on('event.id', '=', 'vol_event.event_id');
					})
					.where('vol_event.account_id', '=', req.session.userId)
			]).then(function(data) {
				console.log(data[3]);
				res.render('profile', {
					account: data[0],
					activities: data[1],
					volunteer: data[2],
					myevents: data[3],
					id: req.session.userId
				});
			}).catch(function(err) {
				console.log(err);
			});
		} else {
			Promise.all([
				knex('account').where({
					id: req.session.userId
				}).first(),
				knex('coordinator')
				.select('coordinator.title')
				.join('account', function() {
					this.on('coordinator.account_id', '=', 'account.id');
				})
				.where({
					account_id: req.session.userId
				})
				.first(),
				db.isVolunteer(req.session.userId)
			]).then(function(data) {
				console.log("Now we're here Data = ", data);
				console.log(data[1]);
				res.render('profile', {
					account: data[0],
					title: data[1],
					volunteer: data[2],
					id: req.session.userId
				});
			}).catch(function(err) {
				console.log(err);
			});
		}
	});
});

// Populate profile data on profile edit page
router.get('/profile/edit', function(req, res, next) {
	db.isVolunteer(req.session.userId).then(function(isVolunteer) {
		if (isVolunteer) {
			return Promise.all([
				knex('account').where({
					id: req.session.userId
				}).first(),
				knex('volunteer_activity').select(),
				db.isVolunteer(req.session.userId)
			]).then(function(data) {

				res.render('profile-edit', {
					account: data[0],
					activities: data[1],
					volunteer: data[2],
					id: req.session.userId
				});
			});
		} else {
			return Promise.all([
				knex('account').where({
					id: req.session.userId
				}).first(),
				db.isVolunteer(req.session.userId)
			]).then(function(data) {
				res.render('profile-edit', {
					account: data[0],
					volunteer: data[1],
					id: req.session.userId
				});
			});
		}
	});
});


// Edit/update blog post functionality
router.post('/profile/edit', function(req, res, next) {
	db.isVolunteer(req.session.userId).then(function(isVolunteer) {
		if (isVolunteer) {
			return Promise.all([
				knex('account').where({id: req.session.userId})
          .update({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					city: req.body.city,
					email: req.body.email,
					phone: req.body.phone,
					bio: req.body.bio
				}),
				knex('volunteer').update({activity_id: req.body.activity_id}).where({
					account_id: req.session.userId
				})
			]).then(function() {
				res.redirect('/profile');
			});
		} else {
			console.log("Hi");
			console.log(req.body);
			return Promise.all([
				knex('account').where({
					id: req.session.userId
				}).update({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					city: req.body.city,
					email: req.body.email,
					phone: req.body.phone,
					bio: req.body.bio
				})
				// knex('coordinator').update({title: req.body.title}).where({account_id: req.session.userId})
			]).then(function() {
				res.redirect('/profile');
			});
		}
	});
});



module.exports = router;
