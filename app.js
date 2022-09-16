const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/postsRoute')
const fileRouter = require('./routes/fileRoute')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express();
// app.use(express.json())
app.use(logger('dev'));
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
require('dotenv').config()

// cors
app.use(require('cors')())

// connect to DB
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;
db.on('error', err =>{
    console.log(`Connect to DB failed : ${err}`)
})

db.once('open', ()=>{
    console.log('Connect to mongoDB successfully !')
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter)
app.use('/file', fileRouter)

// listen port
const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`Server listen on port ${PORT}`)
})


module.exports = app;
