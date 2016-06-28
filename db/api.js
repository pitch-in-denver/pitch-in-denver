var knex = require('./knex');

module.exports = {
  findIdByType: function (type) {
    console.log('type=', type);
    return knex('account_type').select('id').where({type: type}).first();
  },
  findUserByEmail: function (email) {
   return knex('account').select().where({email: email}).first().first();
 },
 addAccount: function (body, type) {
   return knex('account').insert({email: body.email, type: type.id}).returning('id');
 },
 addLocal: function (id, password) {
   return knex('local').insert({account_id: id[0], password: password}).returning('account_id');
 }
};
