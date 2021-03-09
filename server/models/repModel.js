const mongoose = require("mongoose");

const RepSchema = new mongoose.Schema({
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

    // identityProof: {
    //     data: Buffer,
    //     contentType: String,
    // },

    city: {
        type: String,
        required: true
    },

    address: {
        pincode: {
            type: Number,
            exact: 6
        },

        street: String,
        houseNumber: String,
    },

    activity: RepActivitySchema,

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },
})

const Rep = mongoose.model('Rep', RepresentativeSchema);