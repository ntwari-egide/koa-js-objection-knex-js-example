/**
 * MORE ABOUT KOA JS
 * 
 * Koa js provides a minimal interface that can render server files or create an api.
 * 
 * light weight and good support to middle wares
 * 
 * It captures req/res into a single object as a context, provide additional tools
 * 
 * ADDITIONAL MODULES
 * - Koa router
 * - Koa ejs templating
 * - Koa body parser : parse incoming data
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const KoaRouter = require('koa-router')
const { Model } = require('objection')

const app =  new Koa()
const router = new KoaRouter()

// Setting up knex js

const knex = require('./knexfile')
const Todo = require('./models/todo')

// configuring knex and objection models
Model.knex(knex)

// Router middleware
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())


// simple data store
let students = [
    {
        id: 1,
        fullName: "ntwari egide",
        age: 18
    }
]

// first request example
router.get('/students', ctx => {
    return ctx.body = students
})

router.post('/students', async ctx => {
    console.log('post: ', await ctx.req.body);
})

router.get('/users' , async( ctx) => {
    return ctx.body = await knex.select().from('users').then( users => users);
})

router.get('/todos', async (ctx) => {
    // return ctx.body = await knex.select().from('todos').then( todos => todos)

    return ctx.body = await Todo.query();
})

router.get('/todos/:id', async (ctx) => {
    // return ctx.body = await knex
    // .select()
    // .from('todos')
    // .where('id', ctx.params.id)
    // .then( todos => todos)

    return ctx.body = await Todo.query().findById(ctx.params.id)
})

router.get('/todos/done-last', async (ctx) => {
    return ctx.body =  
        await Todo.query()
                .where('completed', true)
                .orderBy('id')
                .limit(1)
})

router.get('/todos/user/:id', async (ctx) => {
    // return ctx.body = await knex
    // .select()
    // .from('todos')
    // .where('user_id', ctx.params.id)
    // .then( todos => todos)

    return ctx.body = await Todo.query()
    .where('user_id', ctx.params.id)
    .orderBy('id');
})

router.post('/todos', async (ctx, next) => {

    console.log("Request: ",ctx.request.body);

    return await knex('todos').insert({
        id: 9,
        title: 'Additional title',
        user_id: 2
    })
    .then( () => {
        return ctx.body
    })
})

router.delete("/todos/:id", async (ctx) => {
    return await knex('todos'). where('id', ctx.params.id). del()
        .then( res => res)
})

router.put('/todos/:id' , async (ctx) => {
    await knex('todos').where ('id', ctx.params.id). update({
        title: 'Additional title Updated'
    })
    .then ( async () => await knex.select().from('todos').then( todos => todos))
})

// app.use( async ctx => {
//     return ctx.body = {msg: "Hello good people"}
// })

app.listen(3091 , () => console.log("Server stared running ..."));