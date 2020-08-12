var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {type: String, require:true},
    age: 'number',
    password: {type: String, require:true},
    userid:{type: String, require:true, unique:true},
    googleid:'number',
});

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