let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// User model
let User = require('../../model/Image');

router.post('/user-profile',upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        prefix: req.body.prefix,
        invoiceNum : 0 ,
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        telNum: req.body.telNum,
        faxNum: req.body.faxNum,
        timeStamp: Date.now(),
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "LOGO AND HEADER ADDED SUCCESSFULY!",
            userCreated: {
                _id: result._id,
                prefix: result.prefix,
                invoiceNum: result.invoiceNum,
                profileImg: result.profileImg,
                companyName: result.companyName,
                companyAddress: result.companyAddress,
                telNum: result.telNum,
                faxNum: result.faxNum,
                timeStamp: result.timeStamp,
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    User.find().sort({$natural:-1}).then(data => {
        res.status(200).json({
            message: "LOGO list retrieved successfully!",
            users: data
        });
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });
});

router.get("/latest", (req, res, next) => {
    User.find().sort({$natural:-1}).limit(1).then(data => {
        res.status(200).json(
         data[0]
        );
    }).catch(err => {
        console.log(err),
            res.status(500).json(null);
    });
});

router.delete("/deletelogo", (req, res, next) => {
    User.findByIdAndDelete(
        req.body.id
    ).then(data => {
        res.status(200).json(
         "SUCCESSFULY DELETED LOGO!"
        );
    }).catch(err => {
        console.log(err),
            res.status(500).json(null);
    });
});


router.post("/updateinvoicenum", (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.id,{invoiceNum:req.body.invoiceNum + 1}
    ).then(data => {
        res.status(200).json(
         "SUCCESSFULY UPDATED INVOICE!"
        );
    }).catch(err => {
        console.log(err),
            res.status(500).json(null);
    });
});


router.get("/latestinvoicenum", (req, res, next) => {
    User.find().sort({$natural:-1}).limit(1).then(data => {
        res.status(200).json(
         data[0].invoiceNum
        );
    }).catch(err => {
        console.log(err),
            res.status(500).json(null);
    });
});
module.exports = router;