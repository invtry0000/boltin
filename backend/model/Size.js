
const mongoose = require('mongoose');
const sizeSchema = mongoose.Schema({
     size: {type:String,unique:true,required:true},
     
})

module.exports = mongoose.model('Size', sizeSchema);