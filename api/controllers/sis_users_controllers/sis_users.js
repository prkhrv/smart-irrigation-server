'use strict';
var mongoose = require('mongoose');
var users = mongoose.model('sis_users');

var bcrypt = require('bcryptjs');
// var config = require('../../config/config');



exports.create_a_user = function(req,res,next){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    users.create({
        user_name:req.body.user_name,
        password: hashedPassword,
        email:req.body.email,
        phone:req.body.phone
    },function(err,user){
        if(err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
};


exports.login_a_user = function(req,res,next){
    users.findOne({user_name:req.body.user_name}).exec(function(err,user){
        if(!user){
            res.send("Noob");
        }else if(user){
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(passwordIsValid){
                res.json({auth:true,message:"Logged in"});
            }else{
                res.json({auth:false,message:"NOT Logged in"});
            }
        }


    });
};
