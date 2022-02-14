const { Model } = require("objection");
const Todo = require("./todo");

class User extends Model{

    static get tableName() {
        return "users"
    }

    static get idColumn(){
        return 'id'
    }

    static relationMappings = {
        todos: {
            relation: Model.HasManyRelation,
            modelClass: Todo,
            join: {
                from :"users.id",
                to: "todos.user_id"
            } 
        }
    }

}

module.exports = User