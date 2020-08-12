var express = require('express');
const User = require("../../models/user");
var db = require('../../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('join/joinform');
});
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
module.exports = router;
