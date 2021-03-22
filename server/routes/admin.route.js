const express = require('express');

const router = express.Router();
const { checker, deleteUser, deleteRepresentative, verifyRepresentative, viewUsers, viewRepresentatives, viewContacts} = require('../controllers/admin.controller')

router.get('/', checker);
router.get('/users', viewUsers);
router.get('/representatives', viewRepresentatives);
router.get('/contacts', viewContacts );
router.put('/representative/:id', verifyRepresentative );
router.delete('/user/:id', deleteUser);
router.delete('/rep/:id', deleteRepresentative);

module.exports = router;