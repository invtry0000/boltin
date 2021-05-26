

const User = require('../../model/User'); 


const addUser  = async (req,res,next) =>{

    const count = await User.countDocuments();

    const addedUser = new User({
        uid: parseInt(count),

       fullName: req.body.fullName,
 
       userName: req.body.userName,
 
       password: req.body.password,
 
       admin: req.body.admin,
 
       stock: req.body.stock,
 
       sales: req.body.sales,
 
       acc: req.body.acc,

       timeStamp: Date.now()
    })
    try{

    const result = await addedUser.save();

    res.json(result);
    }
    catch(err){
        res.json(err.message);
        console.log(err);
    }

 
 }

 const findALLUser = async (req,res,next)=>{

    try{
        const result = await User.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const userAuth = async (req,res,next)=>{
    try{
        const result = await User.findOne({userName:req.body.userName, password: req.body.password}).exec();

        
        
        if(!result){
        
            err = new Error('User Not Found!');
            
            res.json(err.message);
        }else{
            res.json(result)
        }
     

    }catch(err){
        res.json(err);
    }
 }

 const changePassword = async (req,res,next)=>{

    try{
        const result = await User.findOneAndUpdate({$and:[{userName:req.body.userName},{password:req.body.oldpass}]},{password:req.body.newpass}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const userDelete = async (req,res,next)=>{

    try{
        const result = await User.findByIdAndDelete(req.body.id).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 exports.addUser = addUser;
 exports.findALLUser = findALLUser;
 exports.userAuth = userAuth;
 exports.changePassword = changePassword;
 exports.userDelete = userDelete;