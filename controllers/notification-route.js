const router = require('express').Router();

// notification route
router.get('/notification', (req, res) => {
  // If null redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'notification' template
  res.render('notification', {
    loggedIn: req.session.loggedIn, 
    title: 'Socialize',
  });
});

module.exports = router;