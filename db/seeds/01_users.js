/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, full_name: 'Some Guy', email: 'test1@test.com'},
        { id: 2, full_name: 'Some Girl', email: 'test2@test.com'},
        { id: 3, full_name: 'Somone Else', email: 'test3@test.com'},
      ]);
    });
};
