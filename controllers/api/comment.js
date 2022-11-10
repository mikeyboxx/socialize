const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../middleware/auth");

//route to create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
