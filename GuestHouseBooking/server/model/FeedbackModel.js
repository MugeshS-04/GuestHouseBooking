const mongoose = require('mongoose')

const feedbackSch = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
},{timestamp:true})

const feedbackModel = mongoose.model('feedback',feedbackSch)

module.exports = feedbackModel

