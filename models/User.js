const mongoose = require('mongoose');
//mongoose obj has a prop called 'Schema',
// take it & assign it to a new prop called schema
//same as 'const Schema = mongoose.Schema'
const { Schema } = mongoose;

//schema obj
const userSchema = new Schema({
    googleId: String
});

//create model class (collection)
//will not override, will only create if not exist
//2 argus: flow sth into mongoose
mongoose.model('users', userSchema);

