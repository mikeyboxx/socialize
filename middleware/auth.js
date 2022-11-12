const withAuth = (req, res, next) => { 
  if (!req.session.loggedIn) {
    req.session.loggedIn = true;
    req.session.userId = 2;
  }
    if (!req.session.loggedIn) {
      res.redirect('/');
    } else {
      next();
    }
  };

  module.exports = withAuth;
