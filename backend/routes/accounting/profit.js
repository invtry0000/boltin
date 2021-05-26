 
const Profit= require('../../model/Profit');
const Expense = require('../../model/Expense');

const addProfit = async (req,res,next) =>{

    const data = new Profit({
       profit:        req.body.profit,
       timeStamp:  Date.now()
    })
    try{

    const result = await data.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }


 const findProfit= async (req,res,next) =>{

    var total = 0;
    var result = [];
    try{

        if(req.body.minT!==null && req.body.maxT!==null){
             result = await Profit.find({timeStamp:{$gte:req.body.minT,$lte:req.body.maxT}}).exec();
        }
        else if(req.body.minT===null && req.body.maxT!==null){
             result = await Profit.find({timeStamp:{$lte:req.body.maxT}}).exec();
        }
        else if(req.body.minT!==null && req.body.maxT===null){
             result = await Profit.find({timeStamp:{$gte:req.body.minT}}).exec();
        }else{
              result = await Profit.find().exec();
        }

    result.forEach(element => {
        total = total + element.profit
    });
    res.json(total);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }

 const addExpense = async (req,res,next) =>{

    const data = new Expense({
       exp:        req.body.exp,
       timeStamp:  Date.now()
    })
    try{

    const result = await data.save();

    res.json(result);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }

 const findExpense= async (req,res,next) =>{

    var total = 0;
    var result = [];
    try{

        if(req.body.minT!==null && req.body.maxT!==null){
            result = await Expense.find({timeStamp:{$gte:req.body.minT,$lte:req.body.maxT}}).exec();
       }
       else if(req.body.minT===null && req.body.maxT!==null){
            result = await Expense.find({timeStamp:{$lte:req.body.maxT}}).exec();
       }
       else if(req.body.minT!==null && req.body.maxT===null){
            result = await Expense.find({timeStamp:{$gte:req.body.minT}}).exec();
       }else{
             result = await Expense.find().exec();
       }
        
    result.forEach(element => {
        total = total + element.exp
    });
    res.json(total);
    }
    catch(err){
        res.json(err);
        console.log(err);
    }

 
 }

 exports.addProfit = addProfit
 exports.addExpense = addExpense
 exports.findProfit = findProfit
 exports.findExpense = findExpense

 