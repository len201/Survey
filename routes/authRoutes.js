const passport = require('passport');

module.exports = (app) => {
    //test
//if someone visit this url, they should be redirect to passport auth flow
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

};
