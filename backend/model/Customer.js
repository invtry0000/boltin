
const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
     customer: { type: String, unique: true, required: true },
     address: { type: String, required: true },
     contactNum: { type: String, required: true },
     businessStyle: { type: String, required: true },
     PONum: { type: String, required: true },
     TIN: { type: String, required: true },
     timeStamp: {type: Number, required:true}

})

module.exports = mongoose.model('Customer', customerSchema);