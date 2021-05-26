
const Log= require('../../model/Log');

const addLog = async (req,res,next) =>{

    const addedLog = new Log({
        timeStamp: req.body.timeStamp,
        orderStock: req.body.orderStock,
        by: req.body.by,
        status: req.body.status,
        number: req.body.number,
        reference: req.body.reference,
        visible: req.body.visible


    })
    try{

    const result = await addedLog.save();

    res.json(result);
    }
    catch(err){
        res.json(null);
        console.log(err);
    }

 
 }




 const logDelete = async (req,res,next)=>{

    try{
        const result = await Log.findByIdAndDelete({_id:req.body.id}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const findAllLog = async (req,res,next)=>{

    try{
        const result = await Log.find().sort({timeStamp:"desc"}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findLogStock = async (req,res,next)=>{

    try{
        const result = await Log.find({$or:[{visible:"STOCK"},{visible:req.body.userName}]}).sort({timeStamp:"desc"}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findLogSales = async (req,res,next)=>{

    try{
        const result = await Log.find({visible:"SALES"}).sort({timeStamp:"desc"}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findLogTime = async (req,res,next)=>{
   
    try{
        if( req.body.minT !==null && req.body.maxT!==null){
          const result = await Log.find({timeStamp:{$gte:req.body.minT,$lte:req.body.maxT}}).sort({timeStamp:'desc'}).exec();
          console.log(result)
        res.json(result)
       }
       else if(req.body.minT===null && req.body.maxT!==null){
         const   result = await Log.find({timeStamp:{$lte:req.body.maxT}}).sort({timeStamp:'desc'}).exec();
         console.log(result)
        res.json(result)
       }
       else if(req.body.minT!==null && req.body.maxT===null){
         const   result = await Log.find({timeStamp:{$gte:req.body.minT}}).sort({timeStamp:'desc'}).exec();
         console.log(result)
        res.json(result)
       }else{
         const    result = await Log.find().sort({timeStamp:'desc'}).exec();
         console.log(result)
        res.json(result)
       }

    }catch(err){
        res.json(err);

    }
 }

 const changeLogVis = async ( req,res,next)=>{
     try{
         const result = await Log.findByIdAndUpdate(req.body.id,{
             visible: 'NONE'
         })
         res.json(result)
     }catch(err){
         console.log(err)
         res.json(null)
     }
 }


 exports.addLog = addLog;
 exports.logDelete = logDelete;
 exports.findAllLog = findAllLog;
 exports.findLogStock = findLogStock;
 exports.findLogSales = findLogSales;
 exports.findLogTime = findLogTime;
 exports.changeLogVis = changeLogVis;
