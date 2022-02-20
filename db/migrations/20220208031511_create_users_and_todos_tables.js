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

  .createTable('managers', (table) => {
    table.increments().unique();
    table.string('manager_full_name').notNullable();
    table.string('description');
    table.timestamp('registered_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  .createTable('roles', (table) => {
    table.increments().unique();
    table.string('rolename').notNullable();
  })

  .createTable('stuff_chief', (table) => {
    table.increments().unique();
    table.string('fullname').notNullable();
    table.string('nationality');
    table.integer('role_id').references('id').inTable('roles')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // you need to respect the sequence of your relation mapping
  return knex.schema.dropTable('todos').dropTable('users').dropTable('managers').dropTable('roles').dropTable('stuff_chief')
};
