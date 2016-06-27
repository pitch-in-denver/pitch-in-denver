var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('account').select(),
    knex('volunteer_activity').select()
  ]).then(function (result) {
    var account = result[0];
    var volunteer_activity = result[1];
    return Promise.all([
            // Inserts seed entries
            knex('volunteer').insert(
              {
                account_id:find.findFromList('Laney', account, "first_name"),
                activity_id:find.findFromList('musician', volunteer_activity, "activity")
             }),
             knex('volunteer').insert(
             {
               account_id:find.findFromList('Jerome', account, "first_name"),
               activity_id:find.findFromList('therapy animal', volunteer_activity, "activity")
            })
          ]);
    })
};
