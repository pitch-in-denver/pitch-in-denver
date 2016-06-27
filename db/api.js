var knex = require('./knex');

module.exports = {
  findIdByType: function (type) {
    return knex('account_type').select('id').where({type: type}).first();
  }
};
