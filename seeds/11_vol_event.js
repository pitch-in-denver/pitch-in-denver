var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('account').select(),
    knex('event').select()
  ]).then(function (result) {
    var account = result[0];
    var event = result[1];
      return Promise.all([
        // Inserts seed entries
        knex('vol_event').insert(
          {
            account_id:find.findFromList('Jerome', account, "first_name"),
            event_id:find.findFromList('Music for Beverly\'s birthday.', event, "title")
         })
      ]);
    });
};
