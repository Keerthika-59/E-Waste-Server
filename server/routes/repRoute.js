// module.exports = (app) => {
//     const reps = require('../controllers/repController.js');

//     app.post('/reps', reps.create);

//     app.get('/reps', reps.getAll);

//     app.get('/reps/:repId', reps.findOne);

//     app.put('/reps/:repId', reps.update);

//     app.delete('/reps/:repId', reps.delete);

// }
const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let Rep = require('../models/repModel');
const reps = require('../controllers/repController.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('idProof'), (req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const gender = req.body.gender;
    const idProof = req.file.filename;
    const city = req.body.city;
    const address = req.body.address;
    const password = req.body.password;

    const newRepData = {
        name,
        phoneNumber,
        email,
        gender,
        idProof,
        city,
        address,
        password
    }

    const newRep = new Rep(newRepData);

    newRep.save()
        .then(() => res.json('Representative Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get(reps.getAll);

router.route('/:repId').get(reps.findOne);

router.route('/:repId').put(reps.update);

router.route('/:repId').delete(reps.delete);

module.exports = router;