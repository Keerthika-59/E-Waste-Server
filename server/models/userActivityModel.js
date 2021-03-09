const mongoose = reqquire('mongoose');
const UserActivitySchema = new mongoose.Schema({
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
    repId: {
        type: String
    }
})

module.exports = mongoose.model('UserActivities', UserActivitySchema);