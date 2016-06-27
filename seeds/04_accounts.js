var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return knex('account_type').select().then(function(account_type) {
  return Promise.all([
        // Inserts seed entries
        knex('account').insert(
          {
            first_name:'Jerome',
            last_name:'Thomas',
            type:find.findFromList("volunteer", account_type, "type"),
            city:'Denver',
            email:'wlthomas001@gmail.com',
            phone:7204996551,
            bio:'Loves Cats.'
         }),
        knex('account').insert(
          {
            first_name:'Bennett',
            last_name:'Jhoargerar',
            type:find.findFromList("coordinator", account_type, "type"),
            city:'Denver',
            email:'bennettjoerger@gmail.com',
            phone:1234442221,
            bio:'Bathes in crude oil.'
        }),
        knex('account').insert(
          {
            first_name:'Laney',
            last_name:'Smith',
            type:find.findFromList("volunteer", account_type, "type"),
            city:'Denver',
            email:'lsmith.unc@gmail.com',
            phone:2112384184,
            bio:'Loves Blackbeard.'
        }),
        knex('account').insert(
          {
            first_name:'Daniel',
            last_name:'Abbott',
            type:find.findFromList("coordinator", account_type, "type"),
            city:'Denver',
            email:'danielpabbott@gmail.com',
            phone:2112384183,
            bio:'Absolutely loves driving.'
        })
      ]);
    });
};
