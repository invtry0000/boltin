
const Location= require('../../model/Location');

const addLocation = async (req,res,next) =>{

    const addedLocation = new Location({
       location:        req.body.location,
       
    })


    try{

    const result = await addedLocation.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }




 const locationDelete = async (req,res,next)=>{

    try{
        const result = await Location.findByIdAndDelete(req.body.id).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const findAllLocation = async (req,res,next)=>{

    try{
        const result = await Location.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findLocation = async (req,res,next)=>{

    try{
        const result = await Location.findOne({location:req.body.location}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 exports.addLocation = addLocation;
 exports.locationDelete = locationDelete;
 exports.findAllLocation = findAllLocation;
 exports.findLocation = findLocation;
