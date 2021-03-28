const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //acess cookie
const passport = require('passport'); //tell passport to use cookie
const bodyParser =  require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//all the app.use: middlewares
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}

// this line is for heroku:
// if Heroku already defined an envir var, sign that var to port
// otherwise by default just use the value of 5000
const PORT = process.env.PORT || 5000;

//tell node to watch comming-in traffic on default Port
app.listen(PORT);
