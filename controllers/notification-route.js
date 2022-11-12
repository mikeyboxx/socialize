const router = require('express').Router();
const {Notification, User, Comment, Reaction} = require('../models');

// notification route
router.get('/', async (req, res) => {
  try {
    console.log(`req.session.userId = ${!req.session.userId ? null : req.session.userId}`);
    const notifications = await Notification.findAll({
      include: [
        {model: Comment,
          include: {model: User}},
        {model: Reaction,
          include: {model: User}},
      ],
      where: {
        user_id: !req.session.userId ? null : req.session.userId 
      },
      order: [['createdAt', 'DESC']]
    });

    const notificationsArr = notifications.map(notification => notification.get(({ plain: true })));

    const notificationCount = await Notification.count({
      where: {
        user_id: !req.session.userId ? null : req.session.userId,
        read_flag: false 
      },
    });

    res.json(notificationsArr);

    // res.render('notifications', {
    //   notificationCount,
    //   notifications: notificationsArr,
    //   loggedIn: req.session.loggedIn
    // });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;