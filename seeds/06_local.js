var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return knex('account').select().then(function(account) {
  return Promise.all([
        // Inserts seed entries
        knex('local').insert(
          {
            account:find.findFromList("Jerome", account, "first_name"),
            password:'Texas4eva'
         })
      ]);
  });
};
