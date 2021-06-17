
const mongoose = require('mongoose');

const purgatorySchema = mongoose.Schema({
     timeStamp:{type: Number, required:true},
     description: { type: String, required: true },
     location: {type: String, required: true},
     size: { type: String, required: true },
     unit: { type: String, required: true },
     quantity: { type: Number, required: true },
     userName: { type: String, required: true },
     id: { type: Number, required: true },
})

module.exports = mongoose.model('Purgatory', purgatorySchema);