var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var moment = require('moment');
// var pickadate = require('pickadate');



router.get('/events/create', function(req, res, next) {
    console.log(req.session.userId)
    res.render('createevent', {account_id:req.session.userId})
});

router.post('/events/create', function(req, res, next) {
  return knex('event').insert(req.body).then(function () {
    res.redirect('/');
  })

})

module.exports = router;
