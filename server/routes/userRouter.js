const dotenv = require("dotenv");
const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
router.get("/", async (req, res,next) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    next({ status: 500, message: "failed to get users" })
    // res.status(500).send();
  }
});
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,     //sameSite:'none'->Cookies will be sent in all contexts, i.e in responses to both first-party
        sameSite: "none",   ///////////and cross-origin requests.If SameSite=None is set,
      })                    ///////////the cookie Secure attribute must also be set (or the cookie will be blocked).
      .send('user created');
  } catch (err) {
    console.error(err);
    res.status(500).send();
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
        existingUser.passwordHash
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
        return res.json(token)
      // res
      //   .cookie("token", token, {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: "none",
      //   })
      //   .send('logged in');
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });

  router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send('logged out');
  });
  router.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);
    } catch (err) {
      res.json(false);
    }
  });

module.exports = router;
