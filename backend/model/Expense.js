
const mongoose = require('mongoose');
const expSchema = mongoose.Schema({
     exp: {type:Number,required:true},
     timeStamp: {type:Number,required:true}
     
})

module.exports = mongoose.model('Expense', expSchema);