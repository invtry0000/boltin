
const mongoose = require('mongoose');

const inventoryfaSchema = mongoose.Schema({
     timeStamp:{type: Number, required:true},
     user:{type:String, required:true},
     data:[]
})

module.exports = mongoose.model('InventoryFA', inventoryfaSchema);