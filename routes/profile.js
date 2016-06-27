var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/profile', function(req, res, next) {
  res.render('profile');
});


module.exports = router;
