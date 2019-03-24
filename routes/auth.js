var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var router = express.Router();

// router.get("/", function(req, res){
//    res.render("landing"); 
// }); 

// =============
// auth Routes
// ============
router.get("/signup", function(req, res){
   res.render("signup");
});
router.post("/signup", function(req, res){
   var newUser = new User({
      username: req.body.username,
      email: req.body.email,
   });
   User.register(newUser, req.body.password, function(err, user){
      if(err){
         // console.log(err);
         req.flash("error", err.message);
         return res.redirect("signup");
      }else{
         passport.authenticate("local")(req, res, function(){
            res.redirect("/");
         });
      }
   });
});
router.get("/login", function(req, res){
   res.render("login");
});
router.post("/login", passport.authenticate("local", {
   successRedirect: "/",
   failureRedirect: "/login"
}),function(req, res){
});
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

module.exports = router ;