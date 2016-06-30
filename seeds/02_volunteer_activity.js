
exports.seed = function(knex, Promise) {
  return Promise.all([
        // Inserts seed entries
        knex('volunteer_activity').insert(
          {
            activity:'Musician'

         }),
        knex('volunteer_activity').insert(
          {
            activity:'Therapy Animal'

        })
      ]);
};
