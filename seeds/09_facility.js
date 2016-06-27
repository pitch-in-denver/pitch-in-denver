var find = require('../helper.js');

exports.seed = function(knex, Promise) {
  return knex('facility_type').select().then(function(facility_type) {
      return Promise.all([
        // Inserts seed entries
        knex('facility').insert(
          {
            name:'Kidz Health Hospital',
            address:'123 Health Lane',
            type_id:find.findFromList('hospital', facility_type, "type"),
            details:'Award winning Children\'s hospital in Denver, Colorado'
         }),
         knex('facility').insert(
         {
           name: 'Eternal Rest',
           address: '155 Evergreen Lane',
           type_id:find.findFromList('retirement home', facility_type, "type"),
           details:'Fantastic swimming pool and exercise facilities'
        })
      ]);
    });
};
