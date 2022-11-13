const router = require("express").Router();
const { Comment, Notification } = require("../../models");
const {QueryTypes} = require("sequelize");
const sequelize = require("../../config/connection");

//route to create a comment
router.post("/",  async (req, res) => {
  try {
    let dbCommentData = await Comment.create({
      contents: req.body.contents,
      post_id: req.body.postId,
      user_id: !req.session.userId ? null : req.session.userId,
    });

    dbCommentData = dbCommentData.get({ plain: true });

    const [{"user_id": postUserId}] = await sequelize.query(
      `SELECT user_id 
          FROM post 
         WHERE post.id = ${req.body.postId}`,
         {type: sequelize.QueryTypes.SELECT});

    // create a row on the Notification table to alert the creator of the Post
    await Notification.create({
      type: 'comment',
      comment_id: dbCommentData.id,
      post_id: req.body.postId,
      user_id: postUserId
    });

    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;