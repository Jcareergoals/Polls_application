var express = require('express'); 
var path = require('path'); 
var bodyParser = require('body-parser'); 
var session = require('express-session'); 
var mongoose = require('mongoose');

var app = express();  

// configuration
app.use(express.static(path.join(__dirname, "./client"))); 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({secret:"Mean Belt Exam 2nd attempt"})); 

mongoose.connect('mongodb://localhost/mean_belt'); 

var _Schema = new mongoose.Schema({

}); 

mongoose.model('_', _Schema); 

// routes 
app 
	// .get('/', function(req, res){

	// }); 

app.listen(8000, function(){
	console.log('listening at port: 8000'); 
}); 