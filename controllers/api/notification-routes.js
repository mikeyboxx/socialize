const router = require("express").Router();
const {Notification} = require("../../models");

// PUT /api/notifications/:id
router.put('/:id', async (req, res) => {
  try {
    // Update the read_flag on the Notifications table
    const notificationData = await Notification.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if id is not found, return eror
    if (!notificationData[0]) {
      res.status(404).json({ message: 'No notification with this id!' });
      return;
    }

    // return the created Notification model instance
    res.status(200).json(notificationData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

