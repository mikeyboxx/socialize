const router = require('express').Router();
const { User } = require('../../models');

// Sign up
router.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    const dbUserData = await User.create(
      req.body
    );
    console.log(dbUserData);
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = dbUserData.id;
        res.status(200).json(dbUserData);
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LogIn
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      },
    });

    if (!dbUserData) {
      res
        .status(399)
        .json({ message: 'Username does not exist. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(399)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.firstName = dbUserData.first_name;
      req.session.lastName = dbUserData.last_name;
      req.session.username = dbUserData.username;
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;