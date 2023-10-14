const { timeStamp } = require('console');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        passwordHash:{
            type:String,
            required:true,
        },
        avatarurl:String,
    },

    {
            timeStamp: true,
    },

)

module.exports = mongoose.model('User',UserSchema);