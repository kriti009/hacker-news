var express = require("express");
var User = require("../models/user");
var passport = require("passport");
// var middleware = require("../middleware");
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
router.isLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }else{
      req.flash("error", "You need to be logged in to do that")
      res.redirect("/login");
   };
}; 


module.exports = router ;