
const mongoose = require('mongoose');
const logSchema = mongoose.Schema({
    timeStamp: {type:Number, required:true},
    orderStock: {type:String, required:true}, // ORDER/STOCK
    by: {type:String, required:true},
    status: {type:String, required:true},
    number:{type:Number, required:false},
    reference: {type:String,required:true},
    visible: {type:String, required:true} // stockmanusername/SALES/NONE/STOCK
})

module.exports = mongoose.model('Log', logSchema);