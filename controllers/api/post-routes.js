const router = require("express").Router();
const sequelize = require("sequelize");
const {User, Post, Comment} = require("../../models");

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {model: User}, 
        {model: Comment,
          include: {model: User}},
      ],
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

    res.status(200).json(post.get(({ plain: true })));

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to add a post
router.post("/", async (req, res) => {
  try {
    const dbPostData = await Post.create({
      contents: req.body.contents,
      user_id: req.session.userId,
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
