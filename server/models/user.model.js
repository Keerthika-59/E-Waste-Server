const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/custo'

mongoose.connect(MONGO_URI).then(() => {
    console.log(`Connected Successfully to customers`);
}).catch((err) => {
    console.log(`Cannot connect`);
})
/*
{
    "status": false,
    "bioDegradable": true,
    "nonBioDegradable": false,
    "donation": [
        {
            "itemName": "pen",
            "category": "statationary"
    }]
}
*/
const UserActivitySchema = new mongoose.Schema(
    {
        bioDegradable: Boolean,
        nonBioDegradable: Boolean,
        donation : [
                {
                itemName : String,
                category : String
            }
        ],

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
        pincode: { type: Number, exact: 6},
        street: String,
        houseNumber: String,
    },
    
    activity : [UserActivitySchema],

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },
})

const User = mongoose.model('User', UserSchema);
const Activity = mongoose.model('Activity', UserActivitySchema);

module.exports = {
    User,
    Activity
}