/**
 * Knex JS OVER VIEW
 * 
 * Is query builder that works with postgresql, mysql and sqlite
 */

//managing snake  case sensitive in object models
const { knexSnakeCaseMappers } = require('objection');

const options = {
    development: {
        client: 'pg',
        connection: 
            {
                host : 'localhost',
                port : 5432,
                user : 'ntwari',
                password : '123',
                database : 'knex_object_koa_study'
            },
        migrations: {
            directory: __dirname+ '/db/migrations'
        },
        seeds: {
            directory: __dirname+ '/db/seeds'
        },
        ...knexSnakeCaseMappers
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname+ '/db/migrations'
        },
        seeds: {
            directory: __dirname+ '/db/seeds'
        },
        ...knexSnakeCaseMappers
    }
}

let env = process.env.NODE_ENV || "development";

const config = options[env]

module.exports = require('knex')(config)