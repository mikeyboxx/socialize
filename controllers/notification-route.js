const router = require('express').Router();
const sequelize = require("../config/connection");
const withAuth = require('../middleware/auth');
const {Notification, User, Comment, Reaction, Post} = require('../models');

// GET /notifications
router.get('/', async (req, res) => {
  try {
    // retrieve all Notifications and associated Posts with their associated Comments and Reactions, with user information of the creator, and total counts of Likes, Dislikes, and Comments of the post
    const notifications = await Notification.findAll({
      include: [
        {model: Post,
          include: [
            {model: User},
            {model: Comment,
              include: {model: User},
              order: [['comment.createdAt', 'DESC']]},
            {model: Reaction,
              include: {model: User},
              order: [['reaction.createdAt', 'DESC']]}
          ]},
        {model: Comment,
          include: {model: User}},
        {model: Reaction,
          include: {model: User}},
      ],
      where: {
        user_id: !req.session.userId ? null : req.session.userId,
        read_flag: false
      },
      order: [['createdAt', 'DESC']], 
      attributes: {
        include: [
          [ //total comments for the post
            sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)'), 
            'totalComments'
          ],
          [ // total reactions of type = 'like'
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'like')`), 
            'totalLikes'
          ],
          [ // total reactions of type = 'dislike'
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'dislike')`), 
            'totalDislikes'
          ],
        ]
      }
    });

    // convert to objects without sequelize metadata
    const notificationsArr = notifications.map(notification => notification.get(({ plain: true })));

    // retrieve a count of all notifications for the loggedin user, that haven't been read yet
    const notificationCount = await Notification.count({
      where: {
        user_id: !req.session.userId ? null : req.session.userId,
        read_flag: false
      },
    });


    // This code is used for debugging. If used, then must comment out res.render code below
    // res.json({
    //   notificationCount,
    //   notifications: notificationsArr,
    //   loggedIn: req.session.loggedIn
    // });

    // pass the object with posts, nbr of notifications, and whether user is loggedin, to notifications.hbs view
    res.render('notifications', {
      notificationCount,
      notifications: notificationsArr,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;