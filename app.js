var express = require('express');
var app = express();
var request = require('request');
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


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
        console.log(data);
    }
    
    res.render('index', {data: data});
})
app.get("*", function(req, res){
	res.send("PAGE NOT FOUND!!");
});
app.listen(3000, function(){
    console.log("Server Connected!!");
});

