
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
     uid: {type:String, unique:true},
     fullName: { type: String, unique: true, required: true },
     userName: { type: String, unique: true,required: true },
     password: { type: String, required: true },
     admin: { type: Boolean, required: true }, 
     stock: { type: Boolean, required: true },
     sales: { type: Boolean, required: true }, 
     acc: { type: Boolean, required: true },
     timeStamp: { type: Number, required: true }
})

module.exports = mongoose.model('User', userSchema);