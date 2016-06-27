var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

router.get('/volsignup', function(req, res, next) {
  res.render('volsignup');
});
router.post('/volsignup', function(req, res, next){
  db.findIdByType(req.body.type).then(function (type){
    console.log(type)
    return knex('account').insert({email: req.body.email, type: type.id}).returning('id').then(function (id){
      console.log(id);
      return knex('local').insert({account: id[0], password: req.body.password});
    }).then(function(){
      res.redirect('/profile');
    });
  });

});
router.get('/coorsignup', function(req, res, next) {
  res.render('coorsignup');
});


module.exports = router;
