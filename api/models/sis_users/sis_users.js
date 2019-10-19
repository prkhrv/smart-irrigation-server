'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user_schema = new Schema({
    user_name:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:String
    }
});


module.exports = mongoose.model('sis_users',user_schema);