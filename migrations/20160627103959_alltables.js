
exports.up = function(knex, Promise) {
  return knex.schema.createTable('account_type', function(table) {
    table.increments();
    table.string('type');
  }).then(function() {
    return knex.schema.createTable('volunteer_activity', function(table) {
      table.increments();
      table.string('activity');
    });
  }).then(function(){
    return knex.schema.createTable('facility_type', function(table) {
      table.increments();
      table.string('type');
    });
  }).then(function(){
    return knex.schema.createTable('account', function(table) {
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.integer('type').references('id').inTable('account_type').onDelete('cascade');
      table.string('city');
      table.string('email');
      table.string('phone');
      table.text('bio');
    });
  }).then(function(){
    return knex.schema.createTable('google', function(table) {
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.string('google_id');
    });
  }).then(function(){
    return knex.schema.createTable('local', function(table) {
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.string('password');
    });
  }).then(function(){
    return knex.schema.createTable('coordinator', function(table) {
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.string('title');
    });
  }).then(function(){
    return knex.schema.createTable('volunteer', function(table) {
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.integer('activity_id').references('id').inTable('volunteer_activity').onDelete('cascade');
    });
  }).then(function(){
    return knex.schema.createTable('facility', function(table) {
      table.increments();
      table.string('name');
      table.string('address');
      table.integer('type_id').references('id').inTable('facility_type').onDelete('cascade');
      table.text('details');
    });
  }).then(function(){
    return knex.schema.createTable('event', function(table) {
      table.increments();
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.string('title');
      table.text('address');
      table.text('details');
      table.string('start_time');
      table.string('end_time');
      table.date('date');
      table.text('description');

    });
  }).then(function(){
    return knex.schema.createTable('vol_event', function(table) {
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.integer('event_id').references('id').inTable('event').onDelete('cascade');
    });
  }).then(function(){
    return knex.schema.createTable('facility_coordinator', function(table) {
      table.integer('account_id').references('id').inTable('account').onDelete('cascade');
      table.integer('facility_id').references('id').inTable('facility').onDelete('cascade');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('facility_coordinator')
  .then(function(){
    return knex.schema.dropTableIfExists('vol_event');
  }).then(function(){
    return knex.schema.dropTableIfExists('event');
  }).then(function(){
    return knex.schema.dropTableIfExists('facility');
  }).then(function(){
    return knex.schema.dropTableIfExists('volunteer');
  }).then(function(){
    return knex.schema.dropTableIfExists('coordinator');
  }).then(function(){
    return knex.schema.dropTableIfExists('local');
  }).then(function(){
    return knex.schema.dropTableIfExists('google');
  }).then(function(){
    return knex.schema.dropTableIfExists('account');
  }).then(function(){
    return knex.schema.dropTableIfExists('facility_type');
  }).then(function(){
    return knex.schema.dropTableIfExists('volunteer_activity');
  }).then(function(){
    return knex.schema.dropTableIfExists('account_type');
  });
};
