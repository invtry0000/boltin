
const mongoose = require('mongoose');
const descriptionSchema = mongoose.Schema({
     description: {type:String,unique:true,required:true},
     
})

module.exports = mongoose.model('Description', descriptionSchema);