const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {

  try {
    const dbCommentData = await Comment.create({
      content: req.body.comment,
      user_id: req.session.userId,
      post_id: req.body.postId
    });
    
    res.status(200).json(dbCommentData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

        
        // Login



module.exports = router;