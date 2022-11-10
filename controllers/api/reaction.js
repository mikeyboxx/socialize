const router = require("express").Router();
const { Reaction } = require("../../models");
const withAuth = require("../../middleware/auth");

//route to add a reaction
router.post("/", withAuth, async (req, res) => {
  try {
    const dbReactionData = await Reaction.create({
      type: req.body.type,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbReactionData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
