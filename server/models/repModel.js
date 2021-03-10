// const mongoose = require("mongoose");

// const RepSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         min: 2,
//         max: 20
//     },

//     phoneNumber: {
//         type: Number,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true

//     },

//     gender: {
//         type: String,
//         required: true
//     },

//     identityProof: {
//        type: String
//     },

//     city: {
//         type: String,
//         required: true
//     },

//     address: {
//         type: String,
//         required: true
//     },

//     // activity: RepActivitySchema,

//     password: {
//         type: String,
//         required: true
//     }

// })

// const Rep = mongoose.model('Rep', RepresentativeSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
        type: String,
        required: true
            // data: Buffer,
            // contentType: String
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    // activity: RepActivitySchema,

    password: {
        type: String,
        required: true
    }
});

const Rep = mongoose.model('Rep', repSchema);

module.exports = Rep;