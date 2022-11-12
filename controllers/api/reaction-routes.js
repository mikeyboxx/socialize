const router = require("express").Router();
const { Reaction, Notification } = require("../../models");

//route to process a like/dislike/undo request of a post reaction
router.post("/",  async (req, res) => {
  try {
    // validate the type
    if (!req.body.type === 'like' ||  req.body.type === 'dislike' || req.body.type === 'undo') {
      res
        .status(399)
        .json({ message: 'Incorrect type. Must be like, dislike, or undo' });
      return;
    };

    // delete from Reactions table where post_id = req.body.postId AND user_id = req.session.userId (loggedin user)
    await Reaction.destroy({
      where: {
        post_id: req.body.postId,
        user_id: !req.session.userId ? null : req.session.userId // if undefined make null
      },
    });

    // if type is not 'undo' then create a row on the Reaction table for that Post id and Loggedin user
    if (req.body.type !== 'undo') {
      let dbReactionData = await Reaction.create({
        type: req.body.type,
        post_id: req.body.postId,
        user_id: !req.session.userId ? null : req.session.userId
      });

      dbReactionData = dbReactionData.get(({ plain: true }));

      // create a row on the Notification table to alert the creator of the Post
      await Notification.create({
        type: 'reaction',
        reaction_id: dbReactionData.id,
        post_id: req.body.postId,
        user_id: !req.session.userId ? null : req.session.userId
      });
    }

    // get total number of Likes for that Post
    const totalLikes = await Reaction.count({
      where: {
        post_id: req.body.postId,
        type: 'like'
      },
    });

    // get total number of Dislikes for that Post
    const totalDisLikes = await Reaction.count({
      where: {
        post_id: req.body.postId,
        type: 'dislike'
      },
    });

    // package the totals
    const response = {
      totalLikes,
      totalDisLikes
    }

    // send back the new totals
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
