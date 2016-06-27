
exports.seed = function(knex, Promise) {
  return Promise.all([
        // Inserts seed entries
        knex('facility_type').insert(
          {
            type:'hospital'

         }),
        knex('facility_type').insert(
          {
            type:'retirement home'

        }),
        knex('facility_type').insert(
          {
            type:'rehab center'

        })
      ]);
};
