const express = require('express');

const router = express.Router();
const { checker, deleteUser, LogOut, deleteRepresentative, postCredentials, verifyRepresentative, viewUsers, viewRepresentatives, viewContacts, viewUsersById, viewRepresentativesById} = require('../controllers/admin.controller')

router.get('/', checker);
router.get('/users', viewUsers);
router.get('/representatives', viewRepresentatives);
router.get('/users/:id', viewUsersById);
router.get('/representative/:id', viewRepresentativesById);
router.get('/contacts', viewContacts);
router.put('/representative/:id', verifyRepresentative );

router.post('/login', postCredentials);
router.get('/logout', LogOut);

router.delete('/user/:id', deleteUser);
router.delete('/rep/:id', deleteRepresentative);

module.exports = router;