const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//model class
//1 arg: fetch sth out of mongoose
const User = mongoose.model('users');

// Store cookie/token
//user.id is the MongoDB auto-generated id, it's not profile.id
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//pass the token to server when received it as an acquaintance
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user.id);
    });
});

//Google OAuth Flow
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
                    done(null, existingUser);
                } else {
                    //no record, have to make a new record
                    //create a new mongoose instance
                    new User({googleId: profile.id})
                        //save(): save the instance to DB
                        .save()
                        //callback: give another instance (in case of extra change)
                        .then(user => done(null, user));
                }
            });
        }
    )
);
