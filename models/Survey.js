const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient'); //change1

const surverySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],//change2
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, REF: 'User' }, //relationship field
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surverySchema);