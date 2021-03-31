	const express = require ('express');
	const router = express.Router();
	const mysql = require('mysql');

	const bodyParser = require('body-parser');
	const fs = require('fs');
	const mime = require('mime');
 

	// For database connection. 
	const con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "test"});
	con.connect(function(err) { 
		if (err) res.send(err); 
	});

	router.post('/login', (req, res, next) => { 
		res.setHeader('Content-Type', 'application/json'); 
		const loginData = req.body;  
		con.query(" SELECT * FROM user WHERE email = '"+loginData.email+"' AND password = '"+loginData.password+"' ", function (error, result, fields) {
		if (error) res.send(error);
			return res.send(result); 
		});
	});


	router.get('/mahavir',function (req,res,next){
		res.send("request received");
		next(); // this will give you the above exception 
	});

	router.get('/test',(req, res, next) => { 
		res.setHeader('Content-Type', 'application/json'); 
		// this will give you the above exception 
		con.connect(function(err) {
		   if (err) res.send(err); 
		  con.query("SELECT * FROM user", function (err, result, fields) {
			if (err) res.send(err);
			console.log("MTS");
			console.log(result);
			return res.send(result);  
		  });
		});
	});
 
	router.post('/upload/image', (req, res, next) => { 
		// to declare some path to store your converted image
		var matches = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};
			
		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}
		
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');
		let decodedImg = response;
		let imageBuffer = decodedImg.data;
		let type = decodedImg.type;
		let extension = mime.extension(type);
		let fileName = "image" +(+ new Date())+"."+extension;
		try {  
			fs.writeFileSync("./src/assets/sliderImages/" + fileName, imageBuffer, 'utf8');
			con.query("INSERT INTO slider (imagename) VALUES ('"+fileName+"')", function (error, result, fields) {
				if (error) res.send(error);
				return res.send({"status":"success"});
			});
		} catch (e) {
			next(e);
		}
	});
 
 
	router.get('/getSliderImage',(req, res, next) => { 
		con.query("SELECT id,imagename FROM slider", function (err, result, fields) {
			if (err) res.send(err);
			result.forEach(element => {
				element.imagename = "<img src='/assets/sliderImages/"+element.imagename+"' height='200' width='200'/>";
				element.action = "<a href='javascript:void(0)'><DeleteIcon/></a>";
			});
			console.log(result);
			return res.send(result);  
		});
	});
	// router.post('/todos', (req, res, next) => {

	// });

	// router.delete('/todos/:id', (req, res, next) => {

	// })
	module.exports = router; 