const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { Activity } = require('./userModel');

const repSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
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

    idProof: {
        type: String
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

    isVerified : {
        type : Boolean,
        default : false
    },

    status : {
        type : Boolean,
        default : true
    },
    
    activity: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Activity'
        }
    ]
});

const Representative = mongoose.model('Representative', repSchema);

module.exports = Representative;
