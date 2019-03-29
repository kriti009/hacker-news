var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose'),
    passport = require('passport');
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var timediff = require('timediff');


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
    var  date = new Date();
    res.locals.today = date;
    next();
 })


app.use("/", authRoutes);

app.get('/', function(req, res){
    var query = req.query.query || "";
    var tag = req.query.tag || "story";
    var page = req.query.page || "0";
    var data ;
    var url = 'https://hn.algolia.com/api/v1/search?query='+query+'&tags='+tag+'&numericFilters=&page='+page;
    request(url, function(err,  response, body){
        if(err)
            console.log(err);
        else{
            if(response.statusCode == 200){
                data = JSON.parse(body);
                // console.log(data.hits);
                res.render('index', {data: data, query: query, tag: tag, page:page});
            }     
        }
    }) 
        // console.log(data);
});
app.get('/comments/:id', function(req, res){
    var url = 'http://hn.algolia.com/api/v1/items/'+req.params.id;
    request(url, function(err,  response, body){
        if(err)
            console.log(err);
        else{
            if(response.statusCode == 200){
                var data = JSON.parse(body);
                // console.log(data.hits);
                res.render('comments', {data: data});
            }     
        }
    }) 
});



app.get("*", function(req, res){
	res.send("PAGE NOT FOUND!!");
});

app.listen(3000, function(){
    console.log("Server Connected!!");
});

