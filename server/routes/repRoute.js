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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
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

router.route('/add').post(upload.single('idProof'), async (req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const gender = req.body.gender;
    // const idProof = req.file.filename;
    const city = req.body.city;
    const address = req.body.address;
    const password = req.body.password;
    // console.log(req.file);
    const existingUser = await Rep.findOne({ email });
    if (existingUser)
        return res.status(400).json({
            errorMessage: "An account with this email already exists.",
        });
    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(password, salt);
    const newRepData = {
        name,
        phoneNumber,
        email,
        gender,
        // idProof,
        city,
        address,
        password:passwordHash
    }


    const newRep = new Rep(newRepData);

    newRep.save()
        .then(() => res.json('Representative Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
  
      if (!email || !password)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      const existingUser = await Rep.findOne({ email });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      // sign the token
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET
      );
      return res.json(token)
    } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    });

router.route('/').get(reps.getAll);

router.route('/:repId').get(reps.findOne);

router.route('/:repId').put(reps.update);

router.route('/:repId').delete(reps.delete);

module.exports = router;