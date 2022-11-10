const router = require('express').Router();

// Login route
router.get('/', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'login' template
  res.render('login', {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;