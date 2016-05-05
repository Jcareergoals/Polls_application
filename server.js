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

var pollSchema = new mongoose.Schema({
	created_by: String, 
	question: String, 
	date: {type:Date, default: Date.now}, 
	option_1: {
		name: String, 
		count: {type:Number, default: 0}
	},
	option_2: {
		name: String, 
		count: {type:Number, default: 0}
	},
	option_3: {
		name: String, 
		count: {type:Number, default: 0}
	},
	option_4: {
		name: String, 
		count: {type:Number, default: 0}
	}
}); 

mongoose.model('Poll', pollSchema); 
var Poll = mongoose.model('Poll');

// routes 
app 
	.post('/session', function(req, res){
		// console.log(req.body)
		if(req.body.Name){
			req.session.name = req.body.Name
			res.json({status:'success'})
		} else {
			res.json({status:'error'})
		}
	})
	.post('/poll', function(req, res){
		if(req.body.question){
			// console.log(req.body)
			var poll = new Poll()
			poll.option_1.name = req.body.option_1
			poll.option_2.name = req.body.option_2
			poll.option_3.name = req.body.option_3
			poll.option_4.name = req.body.option_4
			poll.save()
			res.json({status:'success'})
		} else {
			res.json({status:'error'})
		}
	})

app.listen(8000, function(){
	console.log('listening at port: 8000'); 
}); 