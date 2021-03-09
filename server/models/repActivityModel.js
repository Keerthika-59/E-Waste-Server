const mongoose = require("mongoose");

const RepActivitySchema = new mongoose.Schema({
    activity: [{
        bioDegradable: Boolean,
        nonBioDegradable: Boolean,
        donation: [{
            itemName: String,
            category: String
        }],
        status: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            // required: true
        }
    }]
})

module.exports = mongoose.model('RepActivities', RepActivitySchema);