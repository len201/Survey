const passport = require('passport');

/**
 * Route handlers
 */

module.exports = (app) => {
//if someone visit this url, they should be redirect to passport auth flow
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/surveys');
        }
    );

    //user logout (before test cur user)
    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });

    //test user auth
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
