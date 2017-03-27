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

// Routes

app.get('/api/', function(req, res){
    console.log('Get Request');
    res.send("Hi amritg!");
});

app.post('/api/companyinfo', function(req, res){
    console.log('Post request');
    
    const URL = 'http://avoindata.prh.fi/opendata/bis/v1/?name=' + req.body.name + '&businessId=' + req.body.bId;
    console.log(URL);
    
    http.get(URL, function(response){
        var rawData = "";

        response.on("data", function (data) {
            rawData += data;
        });

        response.on("end", function() {
            console.log(rawData.length);
            console.log(rawData);
            var parsedData = JSON.parse(rawData);
            res.json(parsedData.results);
        });
    });
});

//  Server Configuration

app.listen(3000, function(){
    console.log("App listening on port: 3000");
});