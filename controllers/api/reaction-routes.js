const router = require("express").Router();
const { Reaction, Notification } = require("../../models");

//route to process a like/dislike/undo request of a post reaction
router.post("/",  async (req, res) => {
  try {
    // delete from reactions table for req.body.post_id  req.session.userId 
    // Get number of likes and number of dislikes for that post
    // if undo then exit
    // create a row on reactions table
    // create a notification for user id of the post
    if (!req.body.type === 'like' ||  req.body.type === 'dislike' || req.body.type === 'undo') {
      res
        .status(399)
        .json({ message: 'Incorrect type. Must be like, dislike, or undo' });
      return;
    };

    const reactionData = await Reaction.destroy({
      where: {
        post_id: req.body.postId,
        user_id: !req.session.userId ? null : req.session.userId
      },
    });

    const totalLikes = await Reaction.count({
      where: {
        post_id: req.body.postId,
        type: 'like'
      },
    });

    const totalDisLikes = await Reaction.count({
      where: {
        post_id: req.body.postId,
        type: 'dislike'
      },
    });

    const response = {
      totalLikes,
      totalDisLikes
    }

    if (req.body.type === 'undo') {
      res.status(200).json(response);
      return;
    }

    const dbReactionData = await Reaction.create({
      type: req.body.type,
      post_id: req.body.post_id,
      user_id: !req.session.userId ? null : req.session.userId
    });

    const dbNotificationData = await Notification.create({
      type: req.body.type,
      post_id: req.body.post_id,
      user_id: !req.session.userId ? null : req.session.userId
    });


    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
