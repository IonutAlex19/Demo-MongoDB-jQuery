var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


var server = app.listen(process.env.PORT || 8000, function(err, res){
	if(err)
		throw err;
	console.log('Connected on port 8000');
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mydb')
	.catch(err => {
		console.log(err);
	})
	.then(() => {
		console.log('Connected');
	});

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

var angajatSchema = new mongoose.Schema({
	nume: String,
	prenume: String,
	functie: String,
	salariu: Number,
	departament: String
}, {collection: 'angajat'});

mongoose.model ('Angajat', angajatSchema);

var Angajat = mongoose.model("Angajat");

var angajatTempObj = {
	nume: 'Popescu',
	prenume: 'Stefan',
	functie: 'lector',
	salariu: '3500',
	departament: 'Informatica'
};

var angajatTemp = new Angajat(angajatTempObj);

//angajatTemp.save();

// Angajat.find({})
// 	.catch(err => {
// 		console.log(err)
// 	})
// 	.then(res => {
// 		console.log(res);
// 	});

//REST API GET

app.get('/selectAllAngajat', function(req, res ) {
	Angajat.find({})
		.catch(err => {
			console.log(err);
		})
		.then(result => {
			res.send(result);
		});
});

app.get('/selectByNameAngajat/:numeAngajat', function(req, res){
	Angajat.find({nume: req.params.numeAngajat})
		.catch(err => {
			console.log(err);
		})
		.then (result => {
			res.send(result);
		});
});

//REST API POST
app.post('/insertAngajat', function(req, res) {
	var angajatTemp = new Angajat (req.body);
	angajatTemp.save();
});


app.post('/update', function(req, res) {
	Angajat.updateOne(req.body.find, req.body.replace)
		.catch(err => {
			console.log(err);
		})
		.then(() => {
			console.log('Success');
		});
});

//REST API DELETE

app.get('/deleteByName/:name', function(req, res) {
	Angajat.deleteOne({nume: req.params.name})
	.catch(err =>{
		console.log(err);
	})
	.then(() => {
		console.log('Success');
	});
});