var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return knex('account').select().then(function(account) {
  return Promise.all([
        // Inserts seed entries
        knex('coordinator').insert(
          {
            account_id:find.findFromList("Bennett", account, "first_name"),
            title:'Director of Fun'
         }),
         knex('coordinator').insert(
         {
           account_id:find.findFromList("Daniel", account, "first_name"),
           title:'People Fun Man'
        })
      ]);
  });
};
