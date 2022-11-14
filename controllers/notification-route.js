const router = require('express').Router();
const sequelize = require("../config/connection");
const withAuth = require('../middleware/auth');
const {Notification, User, Comment, Reaction, Post} = require('../models');

// notification route
router.get('/', async (req, res) => {
  try {
    console.log(`req.session.userId = ${!req.session.userId ? null : req.session.userId}`);
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
          [ 
            sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)'), 
            'totalComments'
          ],
          [
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'like')`), 
            'totalLikes'
          ],
          [
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'dislike')`), 
            'totalDislikes'
          ],
        ]
      }
    });



    const [{"COUNT(*)": totalNbrOfComments}] = await sequelize.query(
      `SELECT COUNT(*) 
          FROM post, comment 
         WHERE post.id = comment.post_id
           AND post.user_id = ${!req.session.userId ? null : req.session.userId}`,{type: sequelize.QueryTypes.SELECT});

    const [{"COUNT(*)":totalNbrOfLikes}] = await sequelize.query(
      `SELECT COUNT(*) 
          FROM post, reaction 
         WHERE post.id = reaction.post_id
           AND post.user_id = ${!req.session.userId ? null : req.session.userId}

           AND reaction.type = 'like'`,{type: sequelize.QueryTypes.SELECT});
           
    const [{"COUNT(*)":totalNbrOfDisLikes}] = await sequelize.query(
      `SELECT COUNT(*) 
          FROM post, reaction 
         WHERE post.id = reaction.post_id
           AND post.user_id = ${!req.session.userId ? null : req.session.userId}
           AND reaction.type = 'dislike'`,{type: sequelize.QueryTypes.SELECT});

    const notificationsArr = notifications.map(notification => notification.get(({ plain: true })));

    const notificationCount = await Notification.count({
      where: {
        user_id: !req.session.userId ? null : req.session.userId,
        read_flag: false 
      },
    });

    // res.json(notificationsArr);

    res.render('notifications', {
     user:{
      totalNbrOfComments,
      totalNbrOfLikes,
      totalNbrOfDisLikes
     },
     
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