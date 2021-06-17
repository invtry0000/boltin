
const mongoose = require('mongoose');
const invoiceSchema = mongoose.Schema({
     id: {type:String,required:true},
     customer: { 
        customer: { type: String,  required: true },
        address: { type: String, required: true },
        contactNum: { type: String, required: true },
        businessStyle: { type: String, required: true },
        PONum: { type: String, required: true },
        TIN: { type: String, required: true },
      },
     deliveredTo: { type: String, required: true },
     status: { type: String,required: true }, //CREATED PREPARING READY FOR SHIPPING SHIPPED
     date: { type: Number, required: true },
     shippingVia: { type: String, required: true }, 
     paid: { type: Boolean, required: true },
     total: {type:Number, required: true},
     remark: [], 
     order: []
})

module.exports = mongoose.model('Invoice', invoiceSchema);