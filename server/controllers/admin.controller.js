// delete user
// delete repersentative
// mark represenattive as verified
const express = require('express');

const User = require('../models/userModel');
const Representative = require('../models/repModel');
const Contact = require('../models/contactModel');

// checker endpoint to check API
exports.checker = async (req, res) => {
    try {
        
        res.send({
            'message' : 'Hello I am Admin'
        })
    } catch (error) {
        res.send({
            'message': 'Failed, Try Again'
        })
    }
}
// view all users
exports.viewUsers = async (req, res) => {

    try {
        const data = await User.find({});

        res.send(data);

    } catch (error) {

        res.send({
            'message': 'Failed to Delete'
        })
    }
}

exports.viewUsersById = async (req, res) => {

    try {

        const id = req.params.id;
        const data = await User.findById(id);

        res.send(data);

    } catch (error) {

        res.send({
            'message': 'Failed to Delete'
        })
    }
}


// view all representatives
exports.viewRepresentatives = async (req, res) => {

    try {
        const data = await Representative.find({});

        res.send(data);

    } catch (error) {

        res.send({
            'message': 'Failed to Delete'
        })
    }
}

exports.viewRepresentativesById = async (req, res) => {

    try {
        const id = req.params.id;

        console.log(id);

        const response = await Representative.findById(id);
        res.send(response.data[0]);

    } catch (error) {

        res.send({
            'message': 'Failed to Delete'
        })
    }
}



// delete a user by ID
exports.deleteUser = async (req, res) => {

    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);

        res.send({
            'message' : 'User Deleted Successfully'
        });

    } catch (error) {

        res.send({
            'message' : 'Failed to Delete'
        })
    }
}


// delete a representative by ID
exports.deleteRepresentative = async (req, res) => {

    try {
        const id = req.params.id;
        await Representative.findByIdAndDelete(id);

        res.send({
            'message': 'Representative Deleted Successfully'
        });

    } catch (error) {

        res.send({
            'message': 'Failed to Delete'
        })
    }
}

// verify a representative
exports.verifyRepresentative = async (req, res) => {

    try {
        const id = req.params.id;
        await Representative.findByIdAndUpdate(id, {
            isVerified : true
        });

        res.send({
            'message': 'Representative Verified'
        });

    } catch (error) {

        res.send({
            'message': 'Failed to Verify Representative'
        })
    }
}

// get all contacts
exports.viewContacts = async (req, res) => {
    try {
        const data = await Contact.find({});

        res.send(data);

    } catch (error) {

        res.send({
            'message': 'Failed to Fetch Contact'
        })
    }
}