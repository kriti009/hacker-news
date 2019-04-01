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

var time_format = {
    units: {
      years:true,
      months: true,
      weeks: true,
      days: true,
      hours: true,
      minutes: true,
      seconds: true,
      milliseconds: true
    },
    returnZeros: false,
    callback: null
  }

// requiring routes

//requiring models
var User = require('./models/user');
var History = require('./models/history');

var authRoutes = require('./routes/auth.js');
// var middleware =/ require('./middleware');

// mongoose.connect("mongodb://localhost:27017/hacker_news",{ useNewUrlParser: true});
var mongoDB = 'mongodb://kriti09:rachana123@ds349175.mlab.com:49175/hacker-news';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

app.get('/',isLoggedIn, function(req, res){
    // if(req.query.query){
    //     res.redirect('/save_history');
    // };
    var  date = new Date();
    var query = req.query.query || "";
    var tag = req.query.type || "story";
    var page = req.query.page || "0";
    var by = req.query.by || 'popularity';  
    var dateRange = req.query.dateRange || 'all';
    var X ;
    if(req.query.query){
        // User.findOne({_id: req.user._id}, ) 
        User.findOne({_id: req.user._id}, function(err, user){
            if(user.history.length >= 5){
                // console.log(user);
                // console.log(user.history.length);
                // console.log(user);
                user.history.shift();
                user.save();
                // console.log(user);
            };
            user.history.push({query:query, tag:tag, by:by, dateRange:dateRange});
            user.save();
        });
        
    }
    if(dateRange == 'all'){
        X=0;
    }else{
        by='date';
        if(dateRange == 'last24h')
            X=3600;
        if(dateRange == 'pastWeek')
            X=604800;
        if(dateRange == 'pastMonth')
            X=259200;
        if(dateRange == 'pastYear')
            X=31104000;
    }
    
    // if(dateRange == 'pastWeek'){
    //     X=0;
    // };
    
    if(by== 'date'){
        var url = 'https://hn.algolia.com/api/v1/search_by_date?query='+query+'&tags='+tag+'&numericFilters=created_at_i>'+X+'&page='+page;    
    }else{
        var url = 'https://hn.algolia.com/api/v1/search?query='+query+'&tags='+tag+'&numericFilters=created_at_i>'+X+'&page='+page;
    }
    request(url, function(err,  response, body){
        if(err)
            console.log(err);
        else{
            if(response.statusCode == 200){
                data = JSON.parse(body);
                // console.log(data.hits);
                res.render('index', {
                    data: data, 
                    query: query, 
                    tag: tag, 
                    page:page, 
                    by:by, 
                    timediff: timediff,
                    time_format : time_format,
                    dateRange: dateRange,
                    x :X
                 });
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
app.get('/history', function(req, res){
    User.findOne({_id: req.user._id}, function(err, user){
        if(err){
            console.log(err);
        }else{
            var history = user.history;
            res.render('history' ,{history: history, timediff:timediff, time_format:time_format});
        }
    });
    
});

function isLoggedIn(req, res, next){
    if( req.isAuthenticated() ){
        return next();
     }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("/login");
  };
};
app.get("*", function(req, res){
	res.send("PAGE NOT FOUND!!");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Connected!!");
});

