var express = require('express');
const User = require("../../models/user");
var db = require('../../db');
var router = express.Router();
var passport = require('../../setuppassport');
var flash = require("connect-flash");

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find({},function(err,users){

        res.render('index');
    })
});
router.get('/joinform',function(req,res,next){

    res.render('join/joinform');
})

router.post('/create',function(req,res,next){
    var user = new User({
        name : req.body.username,
        password : req.body.userpassword,
        userid : req.body.userid,
        age : req.body.userage
    });
    console.log("this is request.");
    console.log(user);



    User.create(user,(err,data)=>{

        if(err){
            console.error(err);
            res.status(404).send({
                message: err 
            });                 
        }

        else{
            res.status(300).send({
                message:"register success"
            });
        }


    });
})

router.get('/loginform',function(req,res,next){
    res.render('join/loginform');
})


router.post('/login',passport.authenticate('local-login',{
    successRedirect:"/",
    failureRedirect:"/join/loginform",
    failureFlash: true
}));

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
})


module.exports = router;
