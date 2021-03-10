const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },

    phoneNumber: {
        type: Number,
        required: true,
        exact: 10
    },

    email: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
         type: String,
        required: true
    },

    // activity: [UserActivitySchema],

    password: {
        type: String,
        required: true
    },

   
})

module.exports = mongoose.model('User', UserSchema);