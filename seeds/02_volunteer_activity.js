
exports.seed = function(knex, Promise) {
  return Promise.all([
        // Inserts seed entries
        knex('volunteer_activity').insert(
          {
            activity:'musician'

         }),
        knex('volunteer_activity').insert(
          {
            activity:'therapy animal'

        })
      ]);
};
