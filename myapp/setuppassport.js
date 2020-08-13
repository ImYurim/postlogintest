var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;


var User = require("./models/user");

// index.js에서 넘겨준 passport입니다.
passport.serializeUser(function (user, done) { // req.session.passport.user에 세션에 저장하는 과정입니다.
    done(null, user.id); // deserializeUser에 값을 넘겨줍니다.
});
passport.deserializeUser(function (id, done) { // 세션에 저장되어있는 값을 DB와 비교하는 과정입니다.
    User.findById(id, function (err, user) {
        done(err, user); // 이때 req.user에 저장됩니다.
    })
});





passport.use('local-login', new LocalStrategy(
    {
        usernameField: "userid",
        passwordField: "password",
        session: true, // 세션에 저장 여부
        passReqToCallback : true,
    }, function (req, userid, password, done) {


        console.log(userid);
        User.findOne({ userid: userid }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('signinMessage', '아이디가 존재하지 않습니다.'));
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (!user.checkPassword(password)) {
                    return done(null, false, req.flash('signinmessage', '비밀번호가 틀렸어요'));
                } else {
                    return done(null, user);
                }
            });
        });
    }
));



module.exports = passport;