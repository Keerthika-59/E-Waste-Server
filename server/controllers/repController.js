const Representative = require('../models/repModel.js');
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// let path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });
// exports.create = (req, res) => {
//     const name = req.body.name;
//     const phoneNumber = req.body.phoneNumber;
//     const email = req.body.email;
//     const gender = req.body.gender;
//     const idProof = req.file.filename;
//     const city = req.body.city;
//     const address = req.body.address;
//     const password = req.body.password;

//     const newRepData = {
//         name,
//         phoneNumber,
//         email,
//         gender,
//         idProof,
//         city,
//         address,
//         password
//     }

//     const newRep = new Rep(newRepData);

//     newRep.save()
//         .then(() => res.json('Representative Added'))
//         .catch(err => res.status(400).json('Error: ' + err));
// };

exports.getAll = (req, res) => {
    Rep.find()
        .then(oRep => {
            console.log("entered")
            console.log(oRep);
            res.send(oRep);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving the Representative details"
            });
        });
};

// Find a single representative with a representativeId
exports.findOne =  async (req, res) => {
    try {
        
        const id = req.params.id;

        const data = await Representative.findById(id);

        res.send(data);

    } catch (error) {
        res.status(500).send({
            'message': "Not Found"
        });
    }
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
            address: req.body.address,
            password: req.body.password

            // activity: {
            //     bioDegradable: req.body.activity.bioDegradable,
            //     nonBioDegradable: req.body.activity.nonBioDegradable,
            //     donation: {
            //         itemName: req.body.activity.donation.itemName,
            //         category: req.body.activity.donation.category
            //     }
            //}
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