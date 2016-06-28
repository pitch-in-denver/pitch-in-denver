var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return knex('account').select().then(function(account) {
  return Promise.all([
        // Inserts seed entries
        knex('google').insert(
          {
            account_id:find.findFromList("Laney", account, "first_name"),
            google_id:'101708887710856880655'
         })
      ]);
  });
};
