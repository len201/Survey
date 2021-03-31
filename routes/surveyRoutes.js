const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    //when receiving user feedback
    app.get('/api/surveys/thanks',(req,res) => {
        res.send('Thanks for submitting the survey. Your feedback is important to us.');
    });


    app.post('/api/surveys',requireLogin, requireCredits, async (req,res) => {
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

        // send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (e) {
            res.status(422).send(e);
        }
    });
};
