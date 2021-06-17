
const Inventory= require('../../model/Inventory');

const Purgatory = require('../../model/Purgatory');
const { addInvoice } = require('../invoice/invoice');
const { recoverInventory } = require('./inventory');

const addPurgatory = async (req,res,next) =>{

    const addedPurge = new Purgatory({
    
       size:        req.body.size,
       description: req.body.description,
       unit:        req.body.unit,
       userName:    req.body.userName,
       quantity:    req.body.quantity,
       location:    req.body.location,
       timeStamp:   Date.now(),
       id:          req.body.id
    })

    try{

    const result = await addedPurge.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }




 const purge = async (req,res,next)=>{

    try{
        const result = await Purgatory.find({userName:req.body.userName}).exec();

        const arrayL = result.length;
        console.log(result)
        console.log(arrayL)
        for(var index = 0; index < arrayL; index++)
            {
                //RECOVER
                const queryResult = await Inventory.findOne({description:result[index].description,
                    size:result[index].size,
                    unit:result[index].unit });

                console.log(queryResult)
                const res = await Inventory.findOneAndUpdate({description:result[index].description,
                        size:result[index].size,
                        unit:result[index].unit
                    },{
                        quantity: result[index].quantity + queryResult.quantity,
                        }).exec();
                console.log(res)
            }

        const purged = await Purgatory.deleteMany({userName:req.body.userName})

        res.json(purged)
    }catch(err){
        res.json(err);

    }
 }

 const deletePurge = async (req,res,next)=>{
     try{
        const purged = await Purgatory.deleteMany({userName: req.body.userName})

        res.json(purged);
     }catch(err){
         res.json(err);
     }
 }

 const deleteOnePurge = async (req,res,next)=>{
    try{
       const purged = await Purgatory.deleteOne({
           userName: req.body.userName,
           id: req.body.id})
       res.json(purged);
    }catch(err){
        res.json(err);
    }
}



exports.deleteOnePurge = deleteOnePurge;
 exports.deletePurge = deletePurge;
 exports.addPurgatory = addPurgatory;
 exports.purge = purge;
