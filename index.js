const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

// this line is for heroku:
// if Heroku already defined an envir var, sign that var to port
// otherwise by default just use the value of 5000
const PORT = process.env.PORT || 5000;

//tell node to watch comming-in traffic on default Port
app.listen(PORT);
