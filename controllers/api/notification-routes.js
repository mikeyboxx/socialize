const router = require("express").Router();
const {Notification} = require("../../models");

router.put('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const notificationData = await Notification.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!notificationData[0]) {
      res.status(404).json({ message: 'No notification with this id!' });
      return;
    }
    res.status(200).json(notificationData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

