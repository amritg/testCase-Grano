// Modules

var express = require('express');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Express Middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'client')));

// Rest APIs

// app.get('/test/', function(req, res){
//     console.log('Get Request');
//     res.send("Hi amritg!");
// });

app.post('/api/companyinfo/', function(req, res, next){
    console.log('Post request');
    const URL = 'http://avoindata.prh.fi/opendata/bis/v1/?name=' + req.body.name + '&businessId=' + req.body.bId;
    console.log(URL);
    
    http.get(URL, function(response){
        var statusCode = response.statusCode;
        console.log(statusCode);

        // if( statusCode !== 200){
        //     console.log("Error code: " + statusCode);
        //     var err = new Error("Something went wrong");
        //     return next(err);
        // }
         if( statusCode == 404){
            console.log("Error code: " + statusCode);
            var err = new Error("Sorry! No match found. ");
            return next(err);
        }

        var rawData = "";
        response.on("data", function (data) {
            rawData += data;
        });

        response.on("end", function() {
            // console.log(rawData);
            var parsedData = JSON.parse(rawData);
            res.send(parsedData.results);
        });
    });
});

// Route for any GET request not already handled

app.get('*', function(req, res, next) {
  var err = new Error(' **** Invalid Link ****');
  next(err);
});

//Error Middleware

app.use(function (err, req, res, next) {
    // console.log(err.message);
    res.json({ error: err.message});
});

//  Server Configuration
    // set the port of our application
    // process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("App listening on port:" + port);
});