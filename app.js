var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose'),
    passport = require('passport');
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");


// requiring routes

//requiring models
var User = require('./models/user');

var authRoutes = require('./routes/auth.js');

mongoose.connect("mongodb://localhost:27017/hacker_news",{ useNewUrlParser: true});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(flash());
//passport and session config
app.use(require("express-session")({
    secret: "hate you!!",
    resave: false,
    saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 
 app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 })


app.use("/", authRoutes);
var url = 'http://hn.algolia.com/api/v1/items/'
app.get('/', function(req, res){
    var data = [];
    var i=1;
    for(i=1 ; i<=2 ; ++i){
        request(url+i, function(err,  response, body){
            if(err)
                console.log(err);
            else{
                if(response.statusCode == 200){
                    data.push(JSON.parse(body));
                }     
            }
        }) 
        // console.log(data);
    }
    res.render('index', {data: data});
});



app.get("*", function(req, res){
	res.send("PAGE NOT FOUND!!");
});
app.listen(3000, function(){
    console.log("Server Connected!!");
});

