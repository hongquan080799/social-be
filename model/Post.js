const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    body : {
        type : String,
        require : false
    },
    imageUrlList : [String],
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    time : {
        type : Date,
        require : false,
        default : new Date()
    }
})


module.exports = mongoose.model('Post', postSchema)