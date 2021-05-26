
const Size= require('../../model/Size');

const addSize = async (req,res,next) =>{

    const addedSize = new Size({
       size:        req.body.size,
    })
    try{

    const result = await addedSize.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }




 const sizeDelete = async (req,res,next)=>{

    try{
        const result = await Size.findByIdAndDelete(req.body.id).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const findAllSize = async (req,res,next)=>{

    try{
        const result = await Size.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findSize = async (req,res,next)=>{

    try{
        const result = await Size.findOne({size:req.body.size}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 exports.addSize = addSize;
 exports.sizeDelete = sizeDelete;
 exports.findAllSize = findAllSize;
 exports.findSize = findSize;
