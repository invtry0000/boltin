const dateMath =require( 'date-arithmetic');
const Profit= require('../../model/Profit');
const Expense = require('../../model/Expense');
const Invoice = require('../../model/Invoice');


///////////////////////////////////////////////////////////////////////////////////////////////
const NextDate = (req,res,next) =>{

var date = new Date(req.body.date)
//date = req.body.date

var nextDate = dateMath.add(date,1,'day')

console.log(nextDate);
res.json([date,nextDate]);
}
///////////////////////////////////////////////////////////////////////////////////////////////
const NextMonth = (req,res,next) =>{

    var date = new Date(req.body.date)
    //date = req.body.date
    
    var nextDate = dateMath.add(date,1,'month')
    
    console.log(nextDate);
    res.json([date,nextDate]);
    }



///////////////////////////////////////////////////////////////////////////////////////////////
const NextYear = (req,res,next) =>{

    var date = new Date(req.body.date)
    //date = req.body.date
        
    var nextDate = dateMath.add(date,1,'year')
        
    console.log(nextDate);
    res.json([date,nextDate]);
    }



  ///////////////////////////////////////////////////////  

 const findProfit= async (start,end) =>{

    var total = 0;
    var result = [];
    try{

            result = await Profit.find({timeStamp:{$gte:start,$lt:end}}).exec();

            result.forEach(element => {
                total = total + element.profit
                                 });

        console.log(total)
    return total
    }
    catch(err){
     return 0
    }

 
 }

 ////////////////////////////////////////////////////////////////////////////////////
 const findExpense= async (start,end) =>{

    var total = 0;
    var result = [];
    try{

            result = await Expense.find({timeStamp:{$gte:start,$lt:end}}).exec();

            result.forEach(element => {
                total = total + element.profit
                                 });

        console.log(total)
    return total
    }
    catch(err){
     return 0
    }

 }

 /////////////////////////////////////////////////////////////////////////////////
 const findSales = async (start,end) =>{

    var total = 0;
    try{

            total = await Invoice.countDocuments({date:{$gte:start,$lt:end}}).exec();

        console.log(total)
    return total
    }
    catch(err){
     return 0
    }

 }


 /////////////////////////////////////////////////////////////////////////////////

    const ChartsForDay = async (req,res,next) => {
        var startdate = new Date(req.body.startdate)
        var enddate = new Date(req.body.enddate)
        var date = new Date()
        var nextDate = new Date()
        var resultRes = {}
        var profit = []
        var expenses = []
        var sales = []
        var dateArray = []
        var i = 0;

            for((date = startdate, i) ; (date<enddate && i <31) ; i++ ){

                nextDate = dateMath.add(date,1,'day')

                profit.push(await findProfit(date,nextDate))

                expenses.push(await findExpense(date,nextDate))
                
                sales.push(await findSales(date,nextDate))

                dateArray.push(
                    Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"}).format(date) 
                )
                
                date = nextDate
            }
        resultRes = {profit,expenses,sales,dateArray}
        console.log(resultRes)
        res.json(resultRes)
    }
////////////////////////////////////////////////////////////////

const ChartsForMonth = async (req,res,next) => {
    var startdate = new Date(req.body.startdate)
    var enddate = new Date(req.body.enddate)
    var date = new Date()
    var nextDate = new Date()
    var resultRes = {}
    var profit = []
    var expenses = []
    var sales = []
    var dateArray = []
    var i = 0;

        for((date = startdate, i) ; (date<enddate && i <31) ; i++ ){

            nextDate = dateMath.add(date,1,'month')

            profit.push(await findProfit(date,nextDate))

            expenses.push(await findExpense(date,nextDate))
            
            sales.push(await findSales(date,nextDate))

            dateArray.push(
                Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long"}).format(date) 
            )
            
            date = nextDate
        }
    resultRes = {profit,expenses,sales,dateArray}
    console.log(resultRes)
    res.json(resultRes)
}


//////////////////////////////////////////////////////

const ChartsForYear = async (req,res,next) => {
    var startdate = new Date(req.body.startdate)
    var enddate = new Date(req.body.enddate)
    var date = new Date()
    var nextDate = new Date()
    var resultRes = {}
    var profit = []
    var expenses = []
    var sales = []
    var dateArray = []
    var i = 0;

        for((date = startdate, i) ; (date<enddate && i <31) ; i++ ){

            nextDate = dateMath.add(date,1,'year')

            profit.push(await findProfit(date,nextDate))

            expenses.push(await findExpense(date,nextDate))
            
            sales.push(await findSales(date,nextDate))

            dateArray.push(
                Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    }).format(date) 
            )
            
            date = nextDate
        }
    resultRes = {profit,expenses,sales,dateArray}
    console.log(resultRes)
    res.json(resultRes)
}

//////////////////////////////////////




exports.NextDate = NextDate
exports.NextMonth = NextMonth
exports.NextYear = NextYear
exports.ChartsForDay = ChartsForDay
exports.ChartsForMonth = ChartsForMonth
exports.ChartsForYear = ChartsForYear