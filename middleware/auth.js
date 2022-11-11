const withAuth = (req, res, next) => { 
  req.session.logged_in = true //delete after testing
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  module.exports = withAuth;
