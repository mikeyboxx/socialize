const router = require('express').Router();
const {QueryTypes} = require("sequelize");
const sequelize = require("../config/connection");
const withAuth = require('../middleware/auth');
const {User, Post, Comment, Notification } = require('../models');

// GET /dashboard
router.get('/', withAuth,  async (req, res) => {
  try {
    // retrieve all Posts for the loggedin user, and associated Comments, and total counts of Likes, Dislikes, Comments of the post, and whether the loggedin user has already liked/disliked this post
    const posts = await Post.findAll({
      include: [
        {model: User},
        {model: Comment,
          include: {model: User}},
      ],
      order: [['createdAt', 'DESC']],
      where: {
        user_id: !req.session.userId ? null : req.session.userId 
      },
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
          [ // check if a reaction exists with type = 'like', and loggedin user as the creator of the reaction
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'like' AND reaction.user_id = ${!req.session.userId ? null : req.session.userId})`), 
            'totalAlreadyLiked'
          ],
          [ // check if a reaction exists with type = 'dislike', and loggedin user as the creator of the reaction
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'dislike' AND reaction.user_id = ${!req.session.userId ? null : req.session.userId})`), 
            'totalAlreadyDisliked'
          ],
        ]
      }
    });

    // retrieve total number of comments that the loggedin user received for all posts that he/she created
    const [{"COUNT(*)": totalNbrOfComments}] = await sequelize.query(
      `SELECT COUNT(*) 
          FROM post, comment 
         WHERE post.id = comment.post_id
           AND post.user_id = ${!req.session.userId ? null : req.session.userId}`,{type: sequelize.QueryTypes.SELECT});
    
    // retrieve total number of likes that the loggedin user received for all posts that he/she created       
    const [{"COUNT(*)":totalNbrOfLikes}] = await sequelize.query(
      `SELECT COUNT(*) 
          FROM post, reaction 
         WHERE post.id = reaction.post_id
           AND post.user_id = ${!req.session.userId ? null : req.session.userId}
           AND reaction.type = 'like'`,{type: sequelize.QueryTypes.SELECT});
    
    // retrieve total number of dislikes that the loggedin user received for all posts that he/she created       
    const [{"COUNT(*)":totalNbrOfDisLikes}] = await sequelize.query(
      `SELECT COUNT(*) 
          FROM post, reaction 
         WHERE post.id = reaction.post_id
           AND post.user_id = ${!req.session.userId ? null : req.session.userId}
           AND reaction.type = 'dislike'`,{type: sequelize.QueryTypes.SELECT});

    const postArr = posts.map(post => {
      // convert to object without sequelize metadata
      const item = post.get(({ plain: true }));

      // generate a flag for homepage-details.hbs, to decide which html to render
      switch(item.api_id){
        case 1: item.api_cocktail = true;
          break;
        case 2: item.api_horoscope = true;
          break;
        case 3: item.api_dog = true;
          break;
        case 4: item.api_meme = true;
          break;
        default: item.human_post = true;
          break;
      }
      // convert json to object for handlebars decision process
      item.api_object = JSON.parse(item.api_json);
      return item;
    });

    // retrieve a count of all notifications for the loggedin user, that haven't been read yet
    const notificationCount = await Notification.count({
      where: {
        user_id: !req.session.userId ? null : req.session.userId,
        read_flag: false 
      },
    });

    // This code is used for debugging. If used, then must comment out res.render code below
    // res.json({
    //   user: {
    //     firstName: req.session.firstName,
    //     lastName:  req.session.lastName,
    //     username:  req.session.username,
    //     totalNbrOfComments,
    //     totalNbrOfLikes,
    //     totalNbrOfDisLikes
    //   },
    //   notificationCount,
    //   posts: postArr,
    //   loggedIn: req.session.loggedIn
    // });

    // pass the object with posts, nbr of notifications, whether user is loggedin, and stats to dashboard.hbs view
    res.render('dashboard', {
      user: {
        firstName: req.session.firstName,
        lastName:  req.session.lastName,
        username:  req.session.username,
        totalNbrOfComments,
        totalNbrOfLikes,
        totalNbrOfDisLikes
      },
      notificationCount,
      posts: postArr,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;