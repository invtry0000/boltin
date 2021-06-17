
const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({
     location: {type:String,unique:true,required:true},
     
})

module.exports = mongoose.model('Location', locationSchema);