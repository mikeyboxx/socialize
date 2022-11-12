const router = require('express').Router();
const apiRoute = require('./api');
const homePageRoute = require('./homepage-route.js');
const dashboardRoute = require('./dashboard-route.js');
const notificationsRoute = require('./notification-route.js');
const logoutRoute = require('./logout-route.js');
const withAuth = require('../middleware/auth');

router.use('/api', apiRoute);

router.use('/', homePageRoute);

router.use('/logout',  logoutRoute);

router.use('/dashboard', withAuth, dashboardRoute);

router.use('/notifications', withAuth, notificationsRoute);

router.get('*',  (req, res) => {
  res.render('404');
})

module.exports = router;

