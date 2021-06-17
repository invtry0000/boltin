
const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
     timeStamp:{type: Number, required:true},
     description: { type: String, required: true },
     size: { type: String, required: true },
     unit: { type: String, required: true },
     quantity: { type: Number, required: true },
     price: { type: Number, required: true },
     bquantity: { type: Number, required: true },
     capital: {type:Number, required:true},
     location: {type:String, required:true},
     warningLvl: {type:Boolean,  required:true}
})

module.exports = mongoose.model('Inventory', inventorySchema);