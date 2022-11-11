const router = require('express').Router();
const sequelize = require("sequelize");
const {User, Post} = require('../models');
const withAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    
    const posts = await Post.findAll({
      include: [{model: User}],
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
          [
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'like' AND reaction.user_id = ${!req.session.userId ? null : req.session.userId})`), 
            'totalAlreadyLiked'
          ],
          [
            sequelize.literal(`(SELECT COUNT(*) FROM reaction WHERE reaction.post_id = post.id AND reaction.type = 'dislike' AND reaction.user_id = ${!req.session.userId ? null : req.session.userId})`), 
            'totalAlreadyDisliked'
          ],
        ]
      }
    });

  
    const postArr = posts.map(post => {
      const item = post.get(({ plain: true }));

      switch(item.api_id){
        case 1: item.api_cocktail = true;
          break;
        case 2: item.api_horoscope = true;
          break;
        default: item.human_post = true;
          break;
      }
      item.api_object = JSON.parse(item.api_json);
      return item;
    });

    // res.json(postArr);

    res.render('homepage', {
      notificationCount: 4,
      posts: postArr,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;