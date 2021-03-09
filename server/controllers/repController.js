const Rep = require('../models/repModel.js');

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter representative details"
        });
    }

    const rep = new Rep({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        gender: req.body.gender,
        city: req.body.city,
        address: {
            pincode: req.body.address.pincode,
            street: req.body.address.street,
            houseNumber: req.body.address.houseNumber
        },
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,

    });
    console.log(rep);
    rep.save()
        .then(oRep => {
            res.send(oRep);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the representative details"
            });
        });
};

exports.getAll = (req, res) => {
    Rep.find()
        .then(oRep => {
            console.log("entered")
            res.send(oRep);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving the Representative details"
            });
        });
};


// Find a single representative with a representativeId
exports.findOne = (req, res) => {
    Rep.findById(req.params.repId)
        .then(oRep => {
            if (!oRep) {
                return res.status(404).send({
                    message: "Representative not found with id " + req.params.repId
                });
            }
            res.send(oRep);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Representative not found with id " + req.params.repId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Representative with id " + req.params.repId
            });
        });
};

// Update a Representative identified by the RepresentativeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Representative name can not be empty"
        });
    }

    // Find representative and update it with the request body
    Rep.findByIdAndUpdate(req.params.repId, {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            gender: req.body.gender,
            city: req.body.city,
            address: {
                pincode: req.body.address.pincode,
                street: req.body.address.street,
                houseNumber: req.body.address.houseNumber
            },
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            activity: {
                bioDegradable: req.body.activity.bioDegradable,
                nonBioDegradable: req.body.activity.nonBioDegradable,
                donation: {
                    itemName: req.body.activity.donation.itemName,
                    category: req.body.activity.donation.category
                }
            }
        }, { new: true })
        .then(oRep => {
            if (!oRep) {
                return res.status(404).send({
                    message: "Representative not found with id " + req.params.repId
                });
            }
            res.send(oRep);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Representative not found with id " + req.params.repId
                });
            }
            return res.status(500).send({
                message: "Error updating Representative with id " + req.params.repId
            });
        });
};

// Delete a representative with the specified representativeId in the request
exports.delete = (req, res) => {
    Rep.findByIdAndRemove(req.params.repId)
        .then(oRep => {
            if (!oRep) {
                return res.status(404).send({
                    message: "Representative not found with id " + req.params.repId
                });
            }
            res.send({ message: "Representative deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Representative not found with id " + req.params.repId
                });
            }
            return res.status(500).send({
                message: "Could not delete representative with id " + req.params.repId
            });
        });
};