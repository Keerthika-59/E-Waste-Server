const mongoose = require('mongoose');
<<<<<<< HEAD
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
=======
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
>>>>>>> 570913b90425cba124e86dbceac0a3031ad2a16c
    },

    email: {
        type: String,
        required: true
<<<<<<< HEAD

=======
>>>>>>> 570913b90425cba124e86dbceac0a3031ad2a16c
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
<<<<<<< HEAD
        pincode: { type: Number, exact: 6},
        street: String,
        houseNumber: String,
    },
    // password:String,
    password: {
        type: String,
        required: true
    },
    activity : [UserActivitySchema],

    

    // confirmPassword: {
    //     type: String,
    //     required: true
    // },
})

const User = mongoose.model('User', UserSchema);
const Activity = mongoose.model('Activity', UserActivitySchema);

module.exports = {
    User,
    Activity
}
=======
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
>>>>>>> 570913b90425cba124e86dbceac0a3031ad2a16c
