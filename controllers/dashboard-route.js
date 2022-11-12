const router = require('express').Router();
const sequelize = require("sequelize");
const withAuth = require('../middleware/auth');
const {User, Post, Comment, Notification } = require('../models');


router.get('/', withAuth,  async (req, res) => {
  try {
    console.log(`req.session.userId = ${!req.session.userId ? null : req.session.userId}`);
    const posts = await Post.findAll({
      include: [{model: User}],
      order: [['createdAt', 'DESC']],
      where: {
        user_id: !req.session.userId ? null : req.session.userId 
      },
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

    const postArr = posts.map(post => post.get(({ plain: true })));

    const notificationCount = await Notification.count({
      where: {
        user_id: !req.session.userId ? null : req.session.userId,
        read_flag: false 
      },
    });

    // res.json(postArr);

    res.render('dashboard', {
      notificationCount,
      posts: postArr,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/', withAuth, (req, res) => {
//     Post.findAll({
//             where: {
//                 user_id: req.session.user_id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             include: [{
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//     .then(dbPostData => {
//         const posts = dbPostData.map(post => post.get({
//             plain: true
//         }));
//         res.render('dashboard', {
//             posts,
//             loggedIn: true
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

router.get('/edit/:id', withAuth, (req, res) => {
Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: 'No post found with this id'
            });
            return;
        }

        const post = dbPostData.get({
            plain: true
        });

        res.render('edit-post', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/new', (req, res) => {
res.render('add-post', {
    loggedIn: true
})
})

module.exports = router;