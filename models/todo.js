const { Model } = require("objection");

class Todo extends Model{

    static get tableName(){
        return "todos"
    }

    static get idColumn(){
        return 'id'
    }

    static get relationMappings() {

        // we import inside to avoid circular dependencies

        const User = require("./user");

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from : 'todos.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Todo