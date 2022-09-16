const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    active : {
        type : Boolean,
        require: false
    },
    createdTime : {
        type : Date,
        default : new Date(),
        require : false
    },
    updatedTime : {
        type : Date,
        default : new Date(),
        require : false
    },
    logoUrl : {
        type : String,
        default : '',
        require : false
    }

})

module.exports = mongoose.model('User', userSchema)