const UserAct = require('../models/userModel.js');

const {Activity, User}  = require('../models/userModel');
const Representative = require('../models/repModel');

exports.createActivity = async (req, res) => {

    try {
        const id = req.params.id;

        // assigning representative if there is some representative
        let assigned = false;
        const Userdata = await User.findById(id);

        console.log('First-----');

        const Reps = await Representative.findOne({ status : true, city : Userdata.city});

        await Representative.findByIdAndUpdate(id, {
            status : false
        })

        if (Reps) {
            const activityData = new Activity(req.body);
            assigned = true;

            activityData.repDetails.repId = Reps._id;
            activityData.repDetails.repName = Reps.name;
            activityData.repDetails.repPhoneNumber = Reps.phoneNumber;
            
            activityData.userDetails.userId = Userdata._id;
            activityData.userDetails.userName = Userdata.name;
            activityData.userDetails.userPhoneNumber = Userdata.phoneNumber;
            activityData.userDetails.userAddress = Userdata.address;

            await activityData.save();

            Reps.activity.push(activityData);

            Userdata.activity.push(activityData);

            await Userdata.save();
            await Reps.save();

            res.send({
                assigned : true,
                repID : Reps._id
            })

        }

        else {
            res.status(500).send({
               assigned : false
            })
        }

    } catch (error) {
        res.status(500).send({            
            'msg': 'Error Occured'
        })
    }
}

exports.getAll = (req, res) => {
    UserAct.find({})
        .then(oUserAct => {
            console.log("entered")
            res.send(oUserAct);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving the user details"
            });
        });
};

exports.getPendingActivities = async (req, res) => {

    try {

        const pendingActivities = await Activity.find({status : false});

        res.send(pendingActivities);

    } catch (error) {

        res.send({
            'message': 'Failed to Get Any Pending Activity'
        })
    }
}


exports.getCompletedActivities = async (req, res) => {

    try {

        const completedActivities = await Activity.find({ status: true});

        res.send(completedActivities);

    } catch (error) {

        res.send({
            'message': 'Failed to Get Any Completed Activity'
        })
    }
}

// Find a single user with a actId
exports.findOne = (req, res) => {
    UserAct.findById(req.params.actId)
        .then(userAct => {
            if (!userAct) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.actId
                });
            }
            res.send(userAct);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.actId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.actId
            });
        });
};

// Update a user identified by the actId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.bioDegradable) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Find user and update it with the request body
    UserAct.findByIdAndUpdate(req.params.actId, {
            bioDegradable: req.body.bioDegradable,
            nonBioDegradable: req.body.nonBioDegradable,
            donation: {
                itemName: req.body.donation.itemName,
                category: req.body.donation.category
            }
        }, { new: true })
        .then(userAct => {
            if (!userAct) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.actId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.actId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.actId
            });
        });
};

// Delete a user with the specified actId in the request
exports.delete = (req, res) => {
    UserAct.findByIdAndRemove(req.params.actId)
        .then(userAct => {
            if (!userAct) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.actId
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.actId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.actId
            });
        });
};