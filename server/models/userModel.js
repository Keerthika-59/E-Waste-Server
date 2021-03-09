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
        pincode: { type: Number, exact: 6 },
        street: String,
        houseNumber: String,
    },

    activity: [UserActivitySchema],

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('User', UserSchema);