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
			fs.writeFileSync("./public/images/profileImages/" + fileName, imageBuffer, 'utf8');
			con.query("INSERT INTO slider (imagename) VALUES ('"+fileName+"')", function (error, result, fields) {
				if (error) res.send(error);
				return res.send({"status":"success"});
			});
		} catch (e) {
			next(e);
		}
	});
 
	router.get('/getSliderImage',(req, res, next) => { 
		con.query("SELECT id,imagename, id AS action FROM slider", function(err,result,fields){
			if (err) res.send(err);
			return res.send(result);  
		});
	});

	router.post('/removeSliderImage',(req, res, next) => { 
		var id = req.body.id;
		con.query("SELECT id,imagename FROM slider WHERE id="+id, function(err,result,fields){
			if (err) res.send(err);
			con.query("DELETE FROM slider WHERE id = "+id+" ", function(err1,result1,fields1){
				if (err1) res.send(err1);
				fs.unlinkSync("./public/images/sliderImages/"+result[0].imagename);
				return res.send(result1);
			});
		});
	});

	router.post('/signup', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json'); 
		const SignUpData = req.body;
		let fileName = "";
		console.log("SignUpData",SignUpData);

		/* Check email id exist or not */
		con.query("SELECT * FROM `user` WHERE email = '"+req.body.email+"' ", function(err,result,fields){
			if (err) res.send(err);
			return res.send({"status":"error","message":"Email id already used."}); 
		});
		

		if(req.body.profile != ""){
			// to declare some path to store your converted image
			var matches = req.body.profile.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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
			fileName = "image" +(+ new Date())+"."+extension;
			try {  
				fs.writeFileSync("./public/images/sliderImages/" + fileName, imageBuffer, 'utf8');
			} catch (e) {
				next(e);
			}
		}
		con.query("INSERT INTO `user` (name,email,phone,password,profile) VALUES ('"+req.body.name+"', '"+req.body.email+"', '"+req.body.phone+"', '"+req.body.password+"', '"+fileName+"' ) ", function(err,result,fields){
			if (err) res.send(err);
			console.log('User registered successfully');
			return res.send({"status":"error","message":"Something is wrong please try again."});  
		});
	});

	router.post('/updateProfile', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json'); 
		const profileData = req.body;
		let fileName = "";
		console.log("Update Profile Data",profileData);
		let oldImg = "";
		/* get  old image name  */
		con.query("SELECT profile FROM `user` WHERE email = '"+req.body.email+"' ", function(err,result,fields){
			if (err) res.send(err);
			oldImg = result[0].profile;

			if(req.body.profile != "" && oldImg != req.body.profile){
				// to declare some path to store your converted image 
				var matches = req.body.profile.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
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
				fileName = "image" +(+ new Date())+"."+extension;
				try {  
					fs.writeFileSync("./public/images/profileImages/" + fileName, imageBuffer, 'utf8');
				} catch (e) {
					next(e);
				}

				con.query("UPDATE `user` SET name = '"+req.body.name+"', email = '"+req.body.email+"', phone = '"+req.body.phone+"', password = '"+req.body.password+"', profile = '"+fileName+"' WHERE id = "+req.body.id, function(err1,result1,fields1){
					con.query("SELECT * FROM `user` WHERE id = '"+req.body.id+"' ", function(err2,result2,fields2){
						if (err) res.send(err1);
						console.log('Profile updated successfully');
						return res.send({"status":200,"message":"Profile updated successfully","data":result2});  
					});
					
				});
			}else{
				fileName = oldImg; 
				con.query("UPDATE `user` SET name = '"+req.body.name+"', email = '"+req.body.email+"', phone = '"+req.body.phone+"', password = '"+req.body.password+"', profile = '"+fileName+"' WHERE id = "+req.body.id, function(err1,result1,fields1){
					con.query("SELECT * FROM `user` WHERE id = '"+req.body.id+"' ", function(err2,result2,fields2){
						if (err) res.send(err1);
						console.log('Profile updated successfully');
						return res.send({"status":200,"message":"Profile updated successfully","data":result2});  
					});
					
				});
			} 
			
		});		
	});

	// router.delete('/todos/:id', (req, res, next) => {

	// })
	module.exports = router; 