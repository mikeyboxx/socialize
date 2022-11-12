const router = require('express').Router();
const apiRoute = require('./api');
const homePageRoute = require('./homepage-route.js');
const dashboardRoute = require('./dashboard-route.js');
const notificationsRoute = require('./notification-route.js');
const logoutRoute = require('./logout-route.js');
const withAuth = require('../middleware/auth');

// const postPageRoute = require('./postpage-route.js');

router.use('/api', withAuth, apiRoute);

router.use('/', homePageRoute);

router.use('/logout',  logoutRoute);

router.use('/dashboard',  dashboardRoute);

router.use('/notifications',  notificationsRoute);

// router.use('/post', postPageRoute);





router.get('*',  (req, res) => {
  res.render('404');
})



module.exports = router;

