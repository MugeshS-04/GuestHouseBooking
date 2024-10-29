const mongoose = require('mongoose')

const roomSch = mongoose.Schema({
    guesthousename:{
        type:String,
        required:true
    },
    maxcount :{
        type:Number,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    rentperday:{
        type:Number,
        required:true
    },
    imageurls: [],
    currentbookings :[],
    types:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    foodfacility:{
        type: Boolean,
        default: false
    }
},{timestamps : true},)

const roomModel = mongoose.model('rooms',roomSch)

module.exports = roomModel