const router = require('express').Router();
const { User } = require('../../models');

// Sign up

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

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username.toLowerCase() } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;