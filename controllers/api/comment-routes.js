const router = require("express").Router();
const { Comment } = require("../../models");

//route to create a comment
router.post("/",  async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      contents: req.body.contents,
      post_id: req.body.postId,
      user_id: !req.session.userId ? null : req.session.userId,
    });

    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;