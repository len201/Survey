const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //acess cookie
const passport = require('passport'); //tell passport to use cookie
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        //how long this cookie can exist in browser before expired
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey] //encrypt cookie so that no one can change it
    })
)

// tell passport to use cookies to handle OAuth
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// this line is for heroku:
// if Heroku already defined an envir var, sign that var to port
// otherwise by default just use the value of 5000
const PORT = process.env.PORT || 5000;

//tell node to watch comming-in traffic on default Port
app.listen(PORT);
