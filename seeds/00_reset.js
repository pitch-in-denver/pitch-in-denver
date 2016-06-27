exports.seed = function(knex, Promise) {
  return knex('facility_coordinator').del()
  .then(function() {
  return knex('vol_event').del()
}).then(function () {
  return knex('event').del()
}).then(function () {
  return knex('facility').del()
}).then(function () {
  return knex('volunteer').del()
}).then(function () {
  return knex('coordinator').del()
}).then(function () {
  return knex('local').del()
}).then(function () {
  return knex('google').del()
}).then(function () {
  return knex('account').del()
}).then(function () {
  return knex('facility_type').del()
}).then(function () {
  return knex('volunteer_activity').del()
}).then(function () {
  return knex('account_type').del()
})

}
