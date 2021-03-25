// delete user
// delete repersentative
// mark represenattive as verified
const express = require('express');
const jwt = require("jsonwebtoken");

const Representative = require('../models/repModel');
const Contact = require('../models/contactModel');
const Admin = require('../models/adminModel');

const { User, Activity} = require('../models/userModel');

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

exports.postCredentials = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await Admin.findOne({ email : email });

        // sign the token
        const token = jwt.sign({
            user: existingUser._id,
        },
            process.env.JWT_SECRET
        );

        if(existingUser.email === email && existingUser.password === password) {
            res.json(token);
        }
        
        return res.status(401).json({ errorMessage: "Invalid Email or Password." });

    } catch (error) {
        res.status(500).send();
    }
}

exports.LogOut =  (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).send("logged out");
};

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