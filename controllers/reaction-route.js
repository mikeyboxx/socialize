const router = require('express').Router();

// reaction route
router.get('/reaction', (req, res) => {
  // If null redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'reaction' template
  res.render('reaction', {
    loggedIn: req.session.loggedIn, 
    title: 'Socialize',
  });
});

module.exports = router;