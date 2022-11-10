const router = require('express').Router();
const {User, Post, Comment} = require('../models');


// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByPk(req.params.id, {
//       include: [
//         { 
//           model: User,
//           attributes: ['username']
//         },
//         { 
//           model: Comment,
//           attributes: ['content', 'createdAt'],
//           include : [
//             { 
//               model: User,
//               attributes: ['id', 'username'],
//               order: [['createdAt', 'DESC']],
//             },
//           ]
//         },
//       ],
//     });

//     // res.json(post);

//     // res.render('postpage', {
//     //   loggedIn: req.session.loggedIn,  
//     //   title: 'The Tech Blog',
//     //   post: post.get({plain: true})
//     // });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// const router = require('express').Router();
// const {User, Post, Comment} = require('../models');


// router.get('/create', (req, res) => {
//   // If the user is already logged in, redirect to the homepage
//   res.render('createPostPage', {
//     loggedIn: req.session.loggedIn,  
//     title: 'Your Dashboard',
//   });
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByPk(req.params.id, {
//       include: [
//         { 
//           model: User,
//           attributes: ['username']
//         },
//         { 
//           model: Comment,
//           attributes: ['content', 'createdAt'],
//           include : [
//             { 
//               model: User,
//               attributes: ['id', 'username'],
//               order: [['createdAt', 'DESC']],
//             },
//           ]
//         },
//       ],
//     });

//     // res.json(post);

//     res.render('postpage', {
//       loggedIn: req.session.loggedIn,  
//       title: 'The Tech Blog',
//       post: post.get({plain: true})
//     });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;


module.exports = router;