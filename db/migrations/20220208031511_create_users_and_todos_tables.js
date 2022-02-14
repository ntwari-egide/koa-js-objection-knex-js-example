/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments(); // creating auto increment
      table.string('full_name').notNullable();
      table.string('email').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  .createTable('todos', (table) => {
      table.increments();
      table.string('title').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.boolean('completed').notNullable().defaultTo(false)
      table.integer('user_id').references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // you need to respect the sequence of your relation mapping
  return knex.schema.dropTable('todos').dropTable('users')
};
