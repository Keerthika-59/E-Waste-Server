const UserAct = require('../models/userActivityModel.js');

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter Activity details"
        });
    }

    const userAct = new UserAct({
        bioDegradable: req.body.bioDegradable,
        nonBioDegradable: req.body.nonBioDegradable,
        donation: {
            itemName: req.body.donation.itemName,
            category: req.body.donation.category
        }
    });
    console.log(user);
    userAct.save()
        .then(oUser => {
            res.send(oUser);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the user Activity details"
            });
        });
};

exports.getAll = (req, res) => {
    User.find({})
        .then(oUser => {
            console.log("entered")
            res.send(oUser);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving the user details"
            });
        });
};


// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
            bioDegradable: req.body.bioDegradable,
            nonBioDegradable: req.body.nonBioDegradable,
            donation: {
                itemName: req.body.donation.itemName,
                category: req.body.donation.category
            }
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};