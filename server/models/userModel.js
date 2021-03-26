const mongoose = require("mongoose");

const Representative = require('./repModel');
const currentDate = () => {
  const test = new Date();
  return test.toLocaleString();
};

const UserActivitySchema = new mongoose.Schema({
  placedOn: {
    type: String,
    default: currentDate,
  },

    bioWaste: Boolean,
    nonBioWaste: Boolean,
    donation: Boolean,
    cl:Boolean,
    el:Boolean,
    fo:Boolean,
    st: Boolean,
    to:Boolean,
    status: {
        type: Boolean,
        default: false
    },

    userDetails : {
        userName: String,
        userPhoneNumber: String,
        userAddress: String,

        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    },

    repDetails: {
        repName: String,
        repPhoneNumber: String,

        repId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Representative'
        }
    }
});

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },

    phoneNumber: {
        type: String,
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

    password: {
        type: String,
        required: true
    },
    activity: [ 
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Activity'
        }
    ]
});

const User = mongoose.model('User', UserSchema);
const Activity = mongoose.model('Activity', UserActivitySchema);

module.exports = {
    User,
    Activity
};
