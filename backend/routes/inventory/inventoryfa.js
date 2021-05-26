

const InventoryFA = require('../../model/InventoryFA');


const addInventoryFA  = async (req,res,next) =>{

    
    const addedInventory = new InventoryFA({
        timeStamp: req.body.timeStamp,
        user: req.body.user,
        data:req.body.data
    })
    try{

    const result = await addedInventory.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }

 const inventoryFADelete = async (req,res,next)=>{

    try{
        const result = await InventoryFA.findByIdAndDelete(req.body.id).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const findALLInventoryFA = async (req,res,next)=>{

    try{
        const result = await InventoryFA.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findInventoryFA = async (req,res,next)=>{

    try{
        const result = await InventoryFA.findOne({description:req.body.description,size:req.body.size}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const stockExist = async (req,res,next)=>{

    try{
        const result = await InventoryFA.exists();
        res.json(result)
    }catch(err){
        res.json(false);

    }
 }

exports.stockExist = stockExist
exports.addInventoryFA = addInventoryFA;
exports.inventoryFADelete = inventoryFADelete;
exports.findALLInventoryFA = findALLInventoryFA;
exports.findInventoryFA = findInventoryFA;


