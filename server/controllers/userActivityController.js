const UserAct = require('../models/userActivityModel.js');

exports.create = (req, res) => {
    // if (!req.body.bioDegradable) {
    //     return res.status(400).send({
    //         message: "Please enter Activity details"
    //     });
    // }

    const userAct = new UserAct({
        bioDegradable: req.body.bioDegradable,
        nonBioDegradable: req.body.nonBioDegradable,
        donation: {
            itemName: req.body.donation.itemName,
            category: req.body.donation.category
        }
    });
    console.log(userAct);
    userAct.save()
        .then(oUserAct => {
            res.send(oUserAct);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the user Activity details"
            });
        });
};

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