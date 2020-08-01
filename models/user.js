const mongoose = require('mongoose');
const unique_validator = require('mongoose-unique-validator');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    phoneNo : {
        type : String,
        required : true
    }
});

function validate(user){
    const userSchema = Joi.object({
        name : Joi.string().min(5).required(),
        email : Joi.string().min(10).email().required(),
        phoneNo : Joi.string().length(10).regex(/^[0-9]+$/).required()
    });

    return userSchema.validate(user);
}


const User = mongoose.model('users',userSchema);


module.exports.User = User;
module.exports.validateUser = validate;
module.exports.userSchema = userSchema;