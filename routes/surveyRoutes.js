const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys',requireLogin, requireCredits, (req,res) => {
        //props of backend server
        const { title, subject, body, recipients } = req.body;
        //create a new instance of a survey
        const survey = new Survery({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(
                email => ({ email: email.trim() })),
            _user:req.user.id,
            dateSent: Date.now()
        });
    });
};
