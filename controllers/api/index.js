const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const notificationRoutes = require("./notification-routes");
const reactionRoutes = require("./reaction-routes");
const commentRoutes = require("./comment-routes");
const withAuth = require('../../middleware/auth');


router.use("/users", userRoutes); // we do not need the auth middleware here

router.use("/posts", withAuth, postRoutes);

router.use("/notifications", withAuth, notificationRoutes);

router.use("/reactions", withAuth, reactionRoutes);

router.use("/comments", withAuth, commentRoutes);

module.exports = router;