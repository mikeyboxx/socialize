const router = require('express').Router();
const {User, Post} = require('../models');


router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ 
        model: User,Comment,Notification,
        attributes: ['username']
      }],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'content', 'createdAt']
    });

    // res.json(posts);

    res.render('homepage', {
      loggedIn: req.session.loggedIn,  
      title: 'Socialize',
      posts: posts.map(post => post.get(({ plain: true })))
    });

  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;