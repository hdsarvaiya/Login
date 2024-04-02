const mongoose = require( 'mongoose' );


var Schema = mongoose.Schema;


var userModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,  
        lowercase: true,      
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type : String ,
        required: true  ,
    },
    phone:{
        type:Number,
        required:true 
    }
    

});

const register = mongoose.model( "Register", userModel);
module.exports = register;