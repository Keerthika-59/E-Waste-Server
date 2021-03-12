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
        minLength : 4,
        maxLength : 50
    },

    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
})

const ContactModel = mongoose.model('ContactModel', ContactSchema);

module.exports = {
    ContactModel
}

