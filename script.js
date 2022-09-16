const mongoose = require('mongoose')
require('dotenv').config()

const User = require('./model/User')
const Post = require('./model/Post')
// connect to DB
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;
db.on('error', err =>{
    console.log(`Connect to DB failed : ${err}`)
})

db.once('open', ()=>{
    console.log('Connect to mongoDB successfully !')
})
const run = async () => {
    console.log(await Post.find())
}

run()