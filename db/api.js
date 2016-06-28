var knex = require('./knex');

module.exports = {
  findIdByType: function (type) {
    return knex('account_type').select('id').where({type: type}).first();
  },
  isVolunteer: function (id) {
  // var type = knex('account_type').select('type').where({id: id}).first();
  // console.log('type=', type);
    if (id % 2 === 0) {
      console.log('false');
      return false;
    } else {
      console.log('true');
    return true;
    }
  },
  findUserByEmail: function (email) {
    return knex('account').select().where({email: email}).first().first();
  },
  addAccount: function (body, type) {
    return knex('account').insert({email: body.email, type: type.id}).returning('id');
  },
  addLocal: function (id, password) {
    return knex('local').insert({account_id: id[0], password: password}).returning('account_id');
  },
  findPasswordById: function (id) {
    return knex('local').select().where({account_id:id}).first();
  }
};
