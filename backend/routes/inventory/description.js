
const Description= require('../../model/Description');
const Size = require('../../model/Size');

const addDescription = async (req,res,next) =>{

    const addedDescription = new Description({
       description:        req.body.description,
       
    })


    try{

    const result = await addedDescription.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }



const addBothDS = async (req,res,next) =>{

    const addedDescription = new Description({
       description:  req.body.description,
       
    })

    const addedSize = new Size({
        size: req.body.size,
        
     })
     var resultD = null;
     var resultS = null;

    try{
    
        if(req.body.description !== '' ){
     resultD = await addedDescription.save();

}

   if(req.body.size  !== ''){
    resultS = await addedSize.save();

    }


    console.log(resultD);
    console.log(resultS);

    var result = {
        resultD,
        resultS
    }
    res.json(result);
    }
    catch(err){
        res.json(err);
    }

 
 }




 const descriptionDelete = async (req,res,next)=>{

    try{
        const result = await Description.findByIdAndDelete(req.body.id).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const findAllDescription = async (req,res,next)=>{

    try{
        const result = await Description.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findDescription = async (req,res,next)=>{

    try{
        const result = await Description.findOne({description:req.body.description}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 exports.addBothDS = addBothDS;
 exports.addDescription = addDescription;
 exports.descriptionDelete = descriptionDelete;
 exports.findAllDescription = findAllDescription;
 exports.findDescription = findDescription;
