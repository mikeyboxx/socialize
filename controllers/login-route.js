const router = require('express').Router();

// Login route
router.get('/', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.json('hey hey hey');

  // Otherwise, render the 'login' template
  // res.render('login', {
  //   loggedIn: req.session.loggedIn,  
  //   title: 'The Tech Blog',
  // });
});

module.exports = router;
