

const { update } = require('../../model/Inventory');
const Inventory = require('../../model/Inventory'); 


 const findALLInventory = async (req,res,next)=>{
    try{
        const result = await Inventory.find().exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const findInventory = async (req,res,next)=>{
     console.log(req.body)
     const description = req.body.description ?? '';
     const size = req.body.size ?? '';
     const unit = req.body.unit ?? '';

    try{
        if(description !== '' && size !== '' && unit!==''){

     console.log('case1')
        const result = await Inventory.find({description:req.body.description,size:req.body.size,unit:req.body.unit}).exec();
        res.json(result)}
        else if(description !== '' && size === '' && unit!==''){

     console.log('case2')
            const result = await Inventory.find({description:req.body.description, unit:req.body.unit}).exec();
        res.json(result)}
        else if(description === '' && size !== '' && unit!==''){

     console.log('case3')
            const result = await Inventory.find({size:req.body.size, unit:req.body.unit}).exec();
        res.json(result)}
        else
        if(description === '' && size === '' && unit !==''){

            console.log('case4')
               const result = await Inventory.find({unit:req.body.unit}).exec();
               res.json(result)}
               else
        
        if(description !== '' && size !== '' && unit ===''){

            console.log('case5')
               const result = await Inventory.find({description:req.body.description,size:req.body.size}).exec();
               res.json(result)}
               else if(description !== '' && size === '' && unit ===''){
       
            console.log('case6')
                   const result = await Inventory.find({description:req.body.description}).exec();
               res.json(result)}
               else if(description === '' && size !== '' && unit ===''){
       
            console.log('case7')
                   const result = await Inventory.find({size:req.body.size}).exec();
               res.json(result)}
               else
        
        
        {

     console.log('case8')

     const result = await Inventory.find().exec();
            res.json(result);
        }
    }catch(err){
        res.json(err);

    }
 }



 const reduceInventory = async (req,res,next)=>{
    
    try{
        var warningLvl;
        const queryResult = await Inventory.findOne({description:req.body.description,size:req.body.size, unit:req.body.unit});

        if(queryResult.quantity -req.body.quantity < 0.3*queryResult.bquantity){
                    warningLvl = true;
            }else{
                warningLvl = false;
            }

        const result = await Inventory.findOneAndUpdate({description:req.body.description,size:req.body.size, unit:req.body.unit},{
                                warningLvl:warningLvl,
                                quantity: queryResult.quantity -req.body.quantity 

        }).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const recoverInventory = async (req,res,next)=>{
    
    try{
        const queryResult = await Inventory.findOne({description:req.body.description,
                                                    size:req.body.size,
                                                    unit:req.body.unit });


        const result = await Inventory.findOneAndUpdate({description:req.body.description,
                                                        size:req.body.size,
                                                        unit:req.body.unit
                                                    },{
                                
                                quantity: req.body.quantity + queryResult.quantity,
        }).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }

 const inventoryDelete = async (req,res,next)=>{

    try{
        const result = await Inventory.findOneAndDelete({description:req.body.description,size:req.body.size,unit:req.body.unit}).exec();
        res.json(result)
    }catch(err){
        res.json(err);

    }
 }


 const restock = async (req,res,next) => {

    for(index=0; index<req.body.length; index++){
        var data = req.body[index];
        console.log('This is Data from for each index: '+ index +' DATA: ')
        console.log(data)

        const addedInventory = new Inventory({
            description: data.description,
            size:        data.size,
            unit:       data.unit,
            quantity:   data.quantity,
            price:      data.price,
            capital:     data.capital,
            bquantity:   data.quantity,
            timeStamp:   Date.now(),
            warningLvl:  false
         })
    
            try{
    
            const queryResult = await Inventory.findOne({description:data.description,size:data.size,unit:data.unit});
            console.log('queryResult' + queryResult)
            if(queryResult===null){
                const result = await addedInventory.save();
                console.log(result)
                res.json(result);
            }else{
                var warningLvl;
                if(queryResult.quantity +req.body.quantity < 0.3*queryResult.bquantity){
                    warningLvl = true;
            }else{
                warningLvl = false;
            }
                const result = await Inventory.findOneAndUpdate({description:data.description,size:data.size,unit:data.unit},{
                    warningLvl:warningLvl,
                    price: data.price === 0? queryResult.price : data.price,
                    quantity: data.quantity + queryResult.quantity,
                    bquantity: data.quantity + queryResult.quantity,
                    capital: data.capital === 0? queryResult.capital : data.capital,
                    timeStamp:Date.now()
                    }).exec();
                    res.json(result)
            }
    
            }catch(err){
                res.json(err);
            }
    }


  


 }

 const updateInventory = async (req,res,next) =>{
                try{ 
                    
                    const base = await Inventory.findById(req.body.id)
                    var basequantity = 0;
                    var warningLvl = false;
                    if(req.body.quantity<base.bquantity)
                    {
                        basequantity = base.bquantity;
                    }else{
                        basequantity = req.body.quantity;
                    }

                    if(req.body.quantity<0.3*basequantity){
                        warningLvl = true;
                    }
                    
                    
                    const response = await Inventory.findByIdAndUpdate(req.body.id,{
                            quantity:req.body.quantity,
                            price: req.body.price,
                            capital: req.body.capital,
                            bquantity: basequantity,
                            warningLvl: warningLvl,
                            timeStamp: Date.now()
                        })
                        res.json(response)
                    }catch(err){
                        res.json(err)
                    }

 }

 const findLength = async (req,res,next)=> {
     try{
        const response = await Inventory.countDocuments()
        res.json(response)
     }catch(err){
         res.json(err)
     }
 }

exports.findLength = findLength;
exports.updateInventory = updateInventory;
exports.findALLInventory = findALLInventory;
exports.findInventory = findInventory;
exports.reduceInventory = reduceInventory;
exports.recoverInventory = recoverInventory;
exports.inventoryDelete = inventoryDelete;
exports.restock = restock;