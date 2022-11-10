const router = require('express').Router();

// Logout
router.get('/', (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
      return;
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router