
exports.seed = function(knex, Promise) {
  return Promise.all([
        // Inserts seed entries
        knex('account_type').insert(
          {
            type:'volunteer'

         }),
        knex('account_type').insert(
          {
            type:'coordinator'

        })
      ]);
};
