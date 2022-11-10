const router = require('express').Router();
const {User, Post} = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['id', 'first_name', 'last_name', 'username']
      }],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'contents', 'api_id', 'api_json', 'createdAt']
    });

    // res.json(posts);
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


    res.render('homepage', {
      // loggedIn: true,
      notificationCount: 4,
      posts: postArr,
      loggedIn: req.session.loggedIn
    });

    // res.render('homepage', {
    //   loggedIn: req.session.loggedIn,
    //   title: 'Socialize',
    //   posts: posts.map(post => post.get(({ plain: true })))
    // });

  } catch (err) {
    res.status(500).json(err);
  }
});




// })


// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.findAll({
//       include: [{
//         model: User,Comment,Notification,
//         attributes: ['username']
//       }],
//       order: [['createdAt', 'DESC']],
//       attributes: ['id', 'title', 'content', 'createdAt']
//     });

//     // res.json(posts);

//     res.render('homepage', {
//       loggedIn: req.session.loggedIn,
//       title: 'Socialize',
//       posts: posts.map(post => post.get(({ plain: true })))
//     });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




module.exports = router;