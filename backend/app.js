

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const userRoute = require('./routes/user/user');
const customerRoute = require('./routes/customer/customer');
const inventoryRoute = require('./routes/inventory/inventory');
const inventoryFARoute = require('./routes/inventory/inventoryfa');
const sizeRoute = require('./routes/inventory/size');
const invoiceRoute = require('./routes/invoice/invoice');
const descriptionRoute = require('./routes/inventory/description');
const logRoute = require('./routes/log/log');
const purgeRoute = require('./routes/inventory/purgatory');
const Profit  = require('./routes/accounting/profit');
const locationRoute = require('./routes/inventory/location');
const Chart = require('./routes/chart/chart')



const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


const api = require('./routes/logo/logo')

var cors = require('cors');

const { addInventoryFA, inventoryFADelete, findALLInventoryFA, findInventoryFA } = require('./routes/inventory/inventoryfa');
const { addInvoice, findAllInvoice } = require('./routes/invoice/invoice');

const User = require('./model/User'); 
const InventoryFA = require('./model/InventoryFA');


const app = express();
const port =5000;

app.listen(port, () => {
   console.log('Server listening on ' + port);
})

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const uri = "mongodb+srv://admin:admin@cluster0.jqyu4.mongodb.net/boltin?retryWrites=true&w=majority";

mongoose.connect(uri , {useUnifiedTopology: true , useNewUrlParser: true } , () => {
   console.log('Connected to Mongo DB Successfully!!');

})

const router = express.Router();

app.use(express.urlencoded());

app.use(express.json());

app.use(cors());
app.options('*', cors())



app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept,Authorization');
   res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE, PUT');

   next();
})
//LOGO ROUTES
app.use('/public', express.static('public'));
app.use('/api', api)

//USER ROUTES

app.post('/adduser', userRoute.addUser);

app.get('/findalluser', userRoute.findALLUser);

app.post('/userauth', userRoute.userAuth);

app.put('/changepassword', userRoute.changePassword);

app.delete('/deleteuser', userRoute.userDelete);


//CUSTOMER ROUTES

app.post('/addcustomer', customerRoute.addCustomer);

app.get('/findallcustomer', customerRoute.findALLCustomer);

app.get('/findcustomer', customerRoute.findCustomer);

app.delete('/deletecustomer', customerRoute.CustomerDelete);


//Inventory

app.get('/findinventorylength', inventoryRoute.findLength)

app.put('/updateinventory', inventoryRoute.updateInventory)

app.get('/findallinventory', inventoryRoute.findALLInventory)

app.post('/findinventory', inventoryRoute.findInventory)

app.put('/reduceinventory', inventoryRoute.reduceInventory)

app.put('/recoverinventory', inventoryRoute.recoverInventory)

app.delete('/inventorydelete', inventoryRoute.inventoryDelete)

app.put('/restock', inventoryRoute.restock)


//Stock
app.post('/addstock', inventoryFARoute.addInventoryFA)

app.delete('/deletestock', inventoryFARoute.inventoryFADelete)

app.get('/findallstock', inventoryFARoute.findALLInventoryFA)

app.get('/findstock', inventoryFARoute.findInventoryFA)

app.get('/stockexist', inventoryFARoute.stockExist)

//invoice

app.post('/concatremarkpaid', invoiceRoute.invoiceConcatRemarkPaid)
app.post('/concatremark', invoiceRoute.invoiceConcatRemark)
app.post('/findinvoice',invoiceRoute.findInvoice)
app.get('/findinvoicelength', invoiceRoute.findLength)
app.post('/addinvoice', invoiceRoute.addInvoice)
app.delete('/deleteinvoice', invoiceRoute.invoiceDelete)
app.get('/findallinvoice', invoiceRoute.findAllInvoice)
app.post('/findinvoiceid', invoiceRoute.findInvoiceID)

//size

app.post('/addsize', sizeRoute.addSize)
app.delete('/deletesize', sizeRoute.sizeDelete)
app.get('/findallsize', sizeRoute.findAllSize)
app.get('/findsize', sizeRoute.findSize)


//description

app.post('/addbothds', descriptionRoute.addBothDS)
app.post('/adddescription', descriptionRoute.addDescription)
app.delete('/deletedescription', descriptionRoute.descriptionDelete)
app.get('/findalldescription', descriptionRoute.findAllDescription)
app.get('/finddescription', descriptionRoute.findDescription)

//location

app.post('/addlocation', locationRoute.addLocation )
app.delete('/deletelocation', locationRoute.locationDelete)
app.get('/findalllocation', locationRoute.findAllLocation)
app.post('/findlocation', locationRoute.findLocation)



//log

app.post('/addlog',logRoute.addLog)
app.delete('/deletelog',logRoute.logDelete)
app.get('/findalllog', logRoute.findAllLog)
app.post('/findlogstock', logRoute.findLogStock)
app.post('/findlogsales', logRoute.findLogSales)
app.post('/findlogtime', logRoute.findLogTime)
app.post('/changelogvis', logRoute.changeLogVis)


//purge

app.post('/addpurge', purgeRoute.addPurgatory)
app.post('/purge', purgeRoute.purge)
app.delete('/deletepurge', purgeRoute.deletePurge)
app.delete('/deleteonepurge', purgeRoute.deleteOnePurge)

//PROFT

app.post('/addprofit', Profit.addProfit)

app.post('/addexpense', Profit.addExpense)

app.post('/findprofit', Profit.findProfit)

app.post('/findexpense', Profit.findExpense)



//charts
app.post('/chartday', Chart.ChartsForDay)
app.post('/chartmonth', Chart.ChartsForMonth)
app.post('/chartyear', Chart.ChartsForYear)

app.post('/NextDate', Chart.NextDate)

