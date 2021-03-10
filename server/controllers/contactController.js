const Contact = require('../models/contactModel.js');

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter contact details"
        });
    }

    const contact = new Contact({

        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        createdAt: new Date()

    });
    console.log(contact);
    contact.save()
        .then(oContact => {
            res.send(oContact);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the contact details"
            });
        });
};

exports.getAll = (req, res) => {
    Contact.find({})
        .then(oContact => {
            console.log("Got the details!")
            res.send(oContact);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving the contact details"
            });
        });
};