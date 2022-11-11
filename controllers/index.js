const router = require('express').Router();

const homePageRoute = require('./homepage-route.js');
const apiRoute = require('./api');
const dashboardRoute = require('./dashboard-route.js');
// const postPageRoute = require('./postpage-route.js');
// const loginRoute = require('./login-route.js');
const logoutRoute = require('./logout-route.js');
const signupRoute = require('./signup-route.js');

router.use('/api', apiRoute);

router.use('/', homePageRoute);

// router.use('/login', loginRoute);

router.use('/signup', signupRoute);

router.use('/logout', logoutRoute);

router.use('/dashboard', dashboardRoute);

// router.use('/post', postPageRoute);





router.get('*',  (req, res) => {
  res.render('404');
})



module.exports = router;

