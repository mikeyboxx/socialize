const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../middleware/auth");

//route to add a post
router.post("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      contents: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
