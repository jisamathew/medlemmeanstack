var express = require ('express');
var app = express();
var morgan = require('morgan');
var port =process.env.PORT || 8080;
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
//order important
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

//http://localhost:8080/users

//db connection
mongoose.connect('mongodb://localhost:27017/medlem',function(err){
   // mongoose.connect('mongodb://jisa:jisa@ds257808.mlab.com:57808/medlem',function(err){
   if(err)
   {
       console.log('Not connected to the db : '+err);
   
    }
    else
    {
    console.log('Connected to Mongodb');  
    } 
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

app.listen(port,function(){
    console.log('Running the server '+port);
});
