var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var noop = function(){};

var userSchema = mongoose.Schema({
    name: {type: String, required:true},
    age: 'number',
    password: {type: String, required:true},
    userid:{type: String, required:true, unique:true},
    googleid:'number',
});

userSchema.pre("save",function(done){
  var user = this;
  if(!user.isModified("password")){
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR,function(err,salt){
    if(err){
      return done(err);
    }
    bcrypt.hash(user.password,salt,noop,function(err,hashedPassword){
      if(err){
        return done(err);
      }
      user.password=hashedPassword;
      done();
    });
  });
});


userSchema.methods.checkPassword = function(password){
  return bcrypt.compareSync(password, this.password)
};


var User = mongoose.model('User',userSchema);

User.create = (newuser, result) => {
    User.find({"userid":newuser.userid}, function(err,user){
        if(user.length>0){
          result('already exists', user.userid);
          return;
        }

        else{
          console.log("this is in modelfile");
          console.log(newuser);


          newuser.save((err, newuser)=>{
  
              try {
                  console.log("done");
                  result(null);
                  return;
              }
  
              catch (err) {// TODO handle the error
                  console.log("error");
                  result(err,newuser.userid);
                  return;
              }
          });
        }
      });
  };
  

module.exports= User;