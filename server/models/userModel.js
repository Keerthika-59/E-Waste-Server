const mongoose = require('mongoose');
// const UserActivitySchema=require('./userActivityModel')
const UserActivitySchema = new mongoose.Schema(
    {
        bioDegradable: Boolean,
        nonBioDegradable: Boolean,
        donation : [{
            itemName : String,
            category : String
        }],

        status: {
            type: Boolean,
            default: false
        }
    }
)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
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
    }
})
module.exports = mongoose.model('User', UserSchema);
