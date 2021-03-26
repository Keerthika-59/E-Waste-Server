const express = require('express');

const router = express.Router();
const { checker, deleteUser,
    LogOut, deleteRepresentative, unverifiedRepresentatives, deleteContacts, completeActivity, viewActivities, postCredentials, verifyRepresentative, viewUsers, viewRepresentatives, viewContacts, viewPendingActivities, viewCompletedActivities, viewRepresentativesById} = require('../controllers/admin.controller')

router.get('/', checker);

router.get('/users', viewUsers);
router.get('/representatives', viewRepresentatives);

router.get('/user/pending/:id', viewPendingActivities);
router.get('/user/completed/:id', viewCompletedActivities);

router.get('/representative/:id', viewRepresentativesById);
router.get('/contacts', viewContacts);

// checking activity by ID
router.get('/activity/:id', viewActivities);

// complete a activity(for representaive dashboard)
router.put('/activity/complete/:id', completeActivity);

//get all unverified representatives
router.get('/representatives/unverified', unverifiedRepresentatives);

// logout
router.get('/logout', LogOut);

// Login
router.post('/login', postCredentials);

// verify a repersentative
router.put('/representative/:id', verifyRepresentative);


router.delete('/user/:id', deleteUser);
router.delete('/rep/:id', deleteRepresentative);
router.delete('/delete/contact/:id', deleteContacts);

module.exports = router;