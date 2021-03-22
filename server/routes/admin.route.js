const express = require('express');

const router = express.Router();
const { checker, deleteUser, deleteRepresentative, verifyRepresentative, viewUsers, viewRepresentatives} = require('../controllers/admin.controller')

router.get('/', checker);
router.get('/users', viewUsers);
router.get('/representatives', viewRepresentatives);
router.put('/representative/:id', verifyRepresentative );
router.delete('/user/:id', deleteUser);
router.delete('/rep/:id', deleteRepresentative);

module.exports = router;