const express = require('express');

const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime');
const routes = require('./routes/index');
const path = require('path');

const app = express();
 
const port = process.env.PORT || 5000;

app.use((req, res, next) => { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
	
app.use('/api', routes); 
/* app.use((req, res, next) => {  res.send('Welcome to Express'); }); */
app.use('/', express.static(path.join(__dirname, 'build')));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});