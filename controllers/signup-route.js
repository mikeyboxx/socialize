const router = require("express").Router();
const withAuth = require("../../middleware/auth");
const { User } = require("../models");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Adding new User */
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    first_name = newUser.first_name;
    last_name = newUser.last_name;

    const usernameExists = await User.countDocuments({
      username: newUser.username,
    });
    if (usernameExists === 1) {
      errors.push({
        param: "username",
        msg: "Invalid username.",
      });
    }
    const emailExists = await User.countDocuments({ email: newUser.email });

    if (emailExists === 1) {
      errors.push({
        param: "email",
        msg: "Invalid e-mail address.",
      });
    }

    newUser.password = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
