const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//model class
const User = mongoose.model('users'); //1 arg: fetch sth out of mongoose

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            //Mongoose queries
            User.findOne({ googleId: profile.id }).then(existingUser =>{
                if (existingUser){
                    //already have a record eith the id, nothing to do
                } else {
                    //no record, have to make a new record
                    //save(): save the record (instance) to DB
                    new User({googleId: profile.id}).save();
                }
            });
        }
    )
);
