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
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser){
                return done(null, existingUser);
            }
            const user = await new User({googleId: profile.id}).save();
            done(null, user);//callback: give another instance (in case of extra change)

        }
    )
);
