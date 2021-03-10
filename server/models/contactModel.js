const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 2,
        max : 20
    },

    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true,
        min : 4,
        max : 50
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Contact', ContactSchema);
