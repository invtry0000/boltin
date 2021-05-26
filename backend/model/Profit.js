
const mongoose = require('mongoose');
const profitSchema = mongoose.Schema({
     profit: {type:Number,required:true},
     timeStamp: {type:Number,required:true}
     
})

module.exports = mongoose.model('Profit', profitSchema);