const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prefix: {type:String},
    invoiceNum: {type:Number},
    companyName: {type:String},
    companyAddress: {type:String},
    telNum: {type:String},
    faxNum: {type:String},
    profileImg: {
        type: String
    },
    timeStamp:{ type:Number},
    themeColor:{type:String}
}, {
    collection: 'logos'
})

module.exports = mongoose.model('Logo', logoSchema)