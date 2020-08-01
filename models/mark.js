const mongoose = require('mongoose');
const { userSchema } = require('../models/user');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

const markSchema = mongoose.Schema({
    english : {
        type: Number,
        required : true,
        default : 0,
    },
    maths : {
        type : Number,
        required : true,
        default : 0,
    },
    science : {
        type : Number,
        required : true,
        default : 0
    },
    total : {
        type : Number,
        required : true,
        default : 0
    },
    user : {
        type : userSchema,
        required : true,
        unique : true
    }
});

const Mark = mongoose.model('marks',markSchema);

function validate(data){

    let marksSchema = joi.object({
        english : joi.number().max(100).min(0),
        maths : joi.number().max(100).min(0),
        science : joi.number().max(100).min(0),
        userId : joi.objectId(userSchema).required(),
    });

    return marksSchema.validate(data);
}

module.exports.Mark = Mark;
module.exports.validateMarks = validate;