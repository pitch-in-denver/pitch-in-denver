var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('account').select(),
    knex('facility').select(),
    knex('volunteer_activity').select()
  ]).then(function (result) {
    var account = result[0];
    var facility = result[1];
    var volunteer_activity = result[2];
      return Promise.all([
        // Inserts seed entries
        knex('event').insert(
          {
            account_id:find.findFromList('Jerome', account, "first_name"),
            title:'Music for Beverly\'s birthday.',
            address:'City Park',
            details:'Street Parking is difficult.',
            start_time:'15:00',
            end_time:'18:00',
            date:'08-13-2016',
            description:'Great event for the old folks.',
            activity_id:find.findFromList('Therapy Animal', volunteer_activity, "activity")

         })
      ]);
  });
};
