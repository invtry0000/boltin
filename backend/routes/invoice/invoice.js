

const Invoice= require('../../model/Invoice');
const { inventoryDelete } = require('../inventory/inventory');

const findLength = async (req,res,next)=> {

    try{
       const response = await Invoice.countDocuments()
       res.json(response)
    }catch(err){
        res.json(err)
    }
}

const addInvoice  = async (req,res,next) =>{

    const addedInvoice = new Invoice({
        id:req.body.id,
       customer:req.body.customer,
       deliveredTo:req.body.deliveredTo,
       status:req.body.status,
       date:req.body.date,
       shippingVia:req.body.shippingVia,
       order:req.body.order,
       remark:req.body.remark,
       paid:req.body.paid,
       total:req.body.total
    })
    try{

    console.log(addedInvoice.toJSON)
    const result = await addedInvoice.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }

 const invoiceDelete = async (req,res,next)=>{

    try{
        const result = await Invoice.findOneAndDelete({id:req.body.id}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findAllInvoice= async (req,res,next)=>{
    try{
        const result = await Invoice.find().sort({date: 'desc'}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }

 }

 const findInvoiceID= async (req,res,next)=>{
    try{
        const result = await Invoice.findById(
            req.body.id
        ).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }

 }

 const findInvoice= async (req,res,next)=>{

    const customer = req.body.customer
    const minTime = req.body.minTime
    const maxTime = req.body.maxTime
    const status = req.body.status
    const paid = req.body.paid

    if(paid===null){
       if(customer === '' && status ==='')
        {
            console.log('case 1')
            try{
                const result = await Invoice.find({date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            } 
        }else
        if (customer !== '' && status ==='')
        {
            console.log('case 2')
            try{
                const result = await Invoice.find({'customer.customer': customer ,date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            } 
        }else
        if (customer === '' && status !=='')
        {
            console.log('case 3')
            try{
                const result = await Invoice.find({status: status ,date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            }    
        }
        else 
        {
            console.log('case 4')
            try{
                const result = await Invoice.find({status: status,'customer.customer':customer,date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            }
        }
    }else{
        if(customer === '' && status ==='')
        {
            console.log('case 1')
            try{
                const result = await Invoice.find({paid:paid, date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            } 
        }else
        if (customer !== '' && status ==='')
        {
            console.log('case 2')
            try{
                const result = await Invoice.find({paid:paid, 'customer.customer': customer ,date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            } 
        }else
        if (customer === '' && status !=='')
        {
            console.log('case 3')
            try{
                const result = await Invoice.find({paid:paid, status: status ,date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            }    
        }
        else 
        {
            console.log('case 4')
            try{
                const result = await Invoice.find({paid:paid, status: status,'customer.customer':customer,date:{$gte:minTime, $lte:maxTime }}).sort({date: 'desc'}).exec();
                res.json(result)
            }catch(err){
                res.json(err);
            }
        }
    }
    
 }

 const invoiceConcatRemark = async (req,res,next) => {
    try{
            const result = await Invoice.findByIdAndUpdate(req.body.id,{
                 $push: { remark: req.body.remark },status:req.body.status
            })
            res.json(result)

    }catch(err){
            console.log(err)
            res.json(null)
    }
 }

 const invoiceConcatRemarkPaid = async (req,res,next) => {
    try{
            const result = await Invoice.findByIdAndUpdate(req.body.id,{
                 $push: { remark: req.body.remark },paid:req.body.paid
            })
            res.json(result)

    }catch(err){
            console.log(err)
            res.json(null)
    }
 }
 exports.invoiceConcatRemarkPaid = invoiceConcatRemarkPaid
 exports.invoiceConcatRemark = invoiceConcatRemark
 exports.findInvoice = findInvoice;
 exports.findLength = findLength;
 exports.addInvoice = addInvoice;
 exports.invoiceDelete = invoiceDelete;
 exports.findAllInvoice = findAllInvoice;
exports.findInvoiceID = findInvoiceID;