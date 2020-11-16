const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route GET api/auth
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // get all fields except password
    res.json(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials.",
            },
          ],
        });
      }

      // match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials.",
            },
          ],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // one hour is 3600 seconds
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
