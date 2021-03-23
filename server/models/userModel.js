const mongoose = require('mongoose');


const UserActivitySchema = new mongoose.Schema({

    bioWaste: Boolean,
    nonBioWaste: Boolean,

    donation: [
        {
            name: String,
            category: String
        }
    ],

    status: {
        type: Boolean,
        default: false
    },

    repId : {
        type : String
    }

});

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

    password: {
        type: String,
        required: true
    },
    
    activity: [UserActivitySchema]
});

const User = mongoose.model('User', UserSchema)
module.exports = User;
