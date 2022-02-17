/**
 * Knex JS OVERVIEW
 * 
 * Is query builder that works with postgresql, mysql and sqlite
 */

 module.exports = {
    development: {
        client: 'pg',
        connection: 
            {
                host : 'localhost',
                port : 5432,
                user : 'egide',
                password : '123',
                database : 'knex_object_koa_study'
            },
        migrations: {
            directory: __dirname+ '/db/migrations'
        },
        seeds: {
            directory: __dirname+ '/db/seeds'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname+ '/db/migrations'
        },
        seeds: {
            directory: __dirname+ '/db/seeds'
        }
    }
}

let env = process.env.NODE_ENV || "development";

const config = require('../knexfile')

module.exports = require('knex')(config)

// MIGRATION
// run -> knex migrate:make create_users_and_todos_tables

// SEED - You have to respect the sequence of relations
// npx knex seed:make 01_users
// npx knex seed:make 02_todos
// npx knex seed:run