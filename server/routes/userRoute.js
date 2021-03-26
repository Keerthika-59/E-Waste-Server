// module.exports = (app) => {
//     const users = require('../controllers/userController.js');

//     app.post('/users', users.create);

//     app.get('/users', users.getAll);

//     app.get('/users/:userId', users.findOne);

//     app.put('/users/:userId', users.update);

//     app.delete('/users/:userId', users.delete);

// }
const dotenv = require("dotenv");
const router = require("express").Router();
const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    // return res.status(200).json(allUsers);
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(`oopps!!! ${err.message}`);
    res.send(500).send("Failed to Get Data");
    // res.status(500).send();
  }
});

router.get("/user/:id", async(req, res) => {
    try {

        const id = req.params.id;
        const data = await User.findById(id);

        console.log(data);

        res.send(data);

    } catch (error) {

        res.send({
            'message': 'No User Found'
        })
    }
})

router.put("/user/:userId", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      gender: req.body.gender,
      city: req.body.city,
      address: req.body.address,
      password: req.body.password,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
});

router.post("/getId", (req, res) => {
  try {
    const { token } = req.body;
    const id = jwt.verify(token, process.env.JWT_SECRET);
    res.send(id.user);
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/signup", async (req, res) => {
  try {
    // const { email, password ,name,phoneNumber,gender,city,address} = req.body;

    const UserPost = new User({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      gender: req.body.gender,
      city: req.body.city,
      address: req.body.address,
      password: req.body.password,
    });

    if (!UserPost.email || !UserPost.password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (UserPost.password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    const existingUser = await User.findOne({ email: UserPost.email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(UserPost.password, salt);

    // save a new user account to the db

    const newUser = new User({
      name: UserPost.name,
      phoneNumber: UserPost.phoneNumber,
      gender: UserPost.gender,
      city: UserPost.city,
      address: UserPost.address,
      email: UserPost.email,
      password: passwordHash,
    });

    await newUser
      .save()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    res.send({
      msg: "Data entered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
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

    // send the token in a HTTP-only cookie
    return res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/userAct/:userId", async (req, res) => {
  try {
    const details = {
      bioWaste: req.body.bio,
      nonBioWaste: req.body.nonbio,
      donation: req.body.donation,
      type1: req.body.type1,
      type2: req.body.type2,
      type3: req.body.type3,
      type4: req.body.type4,
      type5: req.body.type5,
      repId: "idk",
    };
    await User.findByIdAndUpdate(req.params.userId, {
      $push: {
        activity: details,
      },
    });
    res.json({ message: "set" });
    
  } catch (e) {
    console.log(e);
    res.json({ message: "error while setting activity" });
  }
});

module.exports = router;
