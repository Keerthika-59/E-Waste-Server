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
const reps = require('../controllers/repController.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Representative = require('../models/repModel');

dotenv.config();

router.post('/add',  async(req, res) => {

    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const gender = req.body.gender;
    const idProof = req.body.idProof;
    const city = req.body.city;
    const address = req.body.address;
    const password = req.body.password;
    
    const existingUser = await Representative.findOne({ email });
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
        idProof,
        city,
        address,
        password: passwordHash
    }


    const newRep = new Rep(newRepData);

    await newRep.save()
    .then(() => res.json('Representative Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/login", async(req, res) => {
    try {
<<<<<<< HEAD
      const { email, password } = req.body;
  
      // validate
  
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
=======
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

        const token = jwt.sign({
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );
        return res.json(token)
>>>>>>> 472832d5330700d0ed7f3adf769941af2659dfb2
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
});

// router.put("/:repId", (req, res) => {
//     Rep.findByIdAndUpdate(req.params.userId, {
//             name: req.body.name,
//             phoneNumber: req.body.phoneNumber,
//             email: req.body.email,
//             gender: req.body.gender,
//             city: req.body.city,
//             address: req.body.address,
//             password: req.body.password,
//         }, { new: true })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({
//                     message: "user not found with id " + req.params.userId
//                 });
//             }
//             res.send(user);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "user not found with id " + req.params.userId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating user with id " + req.params.userId
//             });
//         });

// })

router.post("/getId", (req, res) => {
    try {
        const { token } = req.body;
        const id = jwt.verify(token, process.env.JWT_SECRET);
        res.send(id.user);
    } catch (e) {
        console.log(e.message);
    }
});

router.route('/').get(reps.getAll);

router.route('/:id').get(reps.findOne);

router.route('/:repId').put(reps.update);

router.route('/:repId').delete(reps.delete);

module.exports = router;