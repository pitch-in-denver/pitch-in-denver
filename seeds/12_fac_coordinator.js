var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('account').select(),
    knex('facility_coordinator').select()
  ]).then(function (result) {
    var account = result[0];
    var facility = result[1];
      return Promise.all([
        // Inserts seed entries
        knex('facility_coordinator').insert(
          {
            account_id:find.findFromList('Bennett', account, "first_name"),
            facility_id:find.findFromList('Eternal Rest', facility, "name")
         })
      ]);
  });
};
