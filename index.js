//import express lib
const express = require('express'); 

//create 1st express app
const app = express();

//create 1st express route handler
app.get('/', (req, res) => {
  res.send( { h1: 'there' });
});

// this line is for heroku:
// if Heroku already defined an envir var, sign that var to port 
// otherwise by default just use the value of 5000
const PORT = process.env.PORT || 5000;

//tell node to watch comming-in traffic on default Port
app.listen(PORT);