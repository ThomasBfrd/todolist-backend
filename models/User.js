const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Thing = require('./Thing');

const userSchema = mongoose.Schema({
    username: {type: String, required: false, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{
        date: {type: Date, required: true},
        description: { type: String, required: true },
        isDone: { type: Boolean, required: false },
        title: { type: String, required: true },
        url: { type: String, required: false }
    }]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)