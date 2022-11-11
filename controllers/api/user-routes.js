const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

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

    const validPassword = await bcrypt.compareSync(req.body.password, dbUserData.password);

    if (!validPassword) {
      res
        .status(399)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

// router.post('/signup', async (req, res) => {
//   // expects {email: 'lernantino@gmail.com', password: 'password1234'}
//   var newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//   });

//   await User.findOne({
//       where: {
//           username: req.body.username,
//           email: req.body.email
//       }
//   }).then(async profile => {
//       if (!profile) {
//           await newUser.save()
//               .then(() => {
//                   res.status(200).send(newUser);
//               })
//               .catch(err => {
//                   console.log("Error is ", err.message);
//               });
//       } else {
//           res.send("User already exists...");
//       }
//   }).catch(err => {
//       console.log("Error is", err.message);
//   });
// });

// Login

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { username: req.body.username.toLowerCase() } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect username, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Logout

