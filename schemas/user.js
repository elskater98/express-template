const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    first_name:{
        type:String,
        minLength:1,
        maxLength:32,
        required:'First name is required.'
    },
    last_name:{
        type:String,
        minLength:1,
        maxLength:32,
        required:'Last name is required.'
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:'Email address is required.',
        validate:[validator.isEmail,'Invalid email.']
    },
    password:{
        type:String,
        minLength:4,
        maxLength:64,
        required:'Password is required.'
    },
    roles:[String]
});

module.exports = mongoose.model('User',UserSchema);
