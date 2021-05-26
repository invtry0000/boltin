

const Customer = require('../../model/Customer'); 


const addCustomer  = async (req,res,next) =>{

    const addedCustomer = new Customer({
       customer: req.body.customer,
 
       address: req.body.address,
 
       contactNum: req.body.contactNum,
 
       businessStyle: req.body.businessStyle,
 
       PONum: req.body.PONum,
 
       TIN: req.body.TIN, 
       
       timeStamp: Date.now()
    })
    try{

    const result = await addedCustomer.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }

 const findALLCustomer = async (req,res,next)=>{

    try{
        const result = await Customer.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findCustomer = async (req,res,next)=>{

    try{
        const result = await Customer.findOne({customer:req.body.customer}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }



 const CustomerDelete = async (req,res,next)=>{

    try{
        const result = await Customer.findByIdAndDelete(req.body.id).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 exports.addCustomer = addCustomer;
 exports.findALLCustomer = findALLCustomer;
 exports.findCustomer= findCustomer;
 exports.CustomerDelete = CustomerDelete;