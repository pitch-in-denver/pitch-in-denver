var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/facility', function(req, res, next) {
    return knex('facility_type').select().then(function(types) {
      res.render('createevent', {type:types});
    })
});

router.post('/facility', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
})

module.exports = router;
