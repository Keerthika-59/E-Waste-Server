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

router.get('/activity/:id', viewActivities);
router.get('/activity/complete/:id', completeActivity);

router.get('/representatives/unverified', unverifiedRepresentatives);

router.put('/representative/:id', verifyRepresentative );

router.post('/login', postCredentials);
router.get('/logout', LogOut);

router.delete('/user/:id', deleteUser);
router.delete('/rep/:id', deleteRepresentative);
router.delete('/delete/contact/:id', deleteContacts);

module.exports = router;