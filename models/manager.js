import knex from "knex";
import { Model } from "objection";

export class Manager extends Model{
    static get tableName(){
        return "managers"
    }

    // table.increments().unique();
    // table.string('manager_full_name').notNullable();
    // table.string('description');
    // table.timestamp('registered_at').defaultTo(knex.fn.now());
    // table.timestamp('updated_at').defaultTo(knex.fn.now())

    // json schema for validation

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['manager_full_name, description'],

            properties: {
                id: { type: 'integer'},
                manager_full_name: { type: 'string', minLength: 1, maxLength: 25 },
                description: { type: 'string',minLength: 1, maxLength: 23 }
            }
        }
    }

    
}