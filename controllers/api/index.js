const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const notificationRoutes = require("./notification-routes");
const reactionRoutes = require("./reaction-routes");
const commentRoutes = require("./comment-routes");


router.use("/users", userRoutes);

router.use("/posts", postRoutes);

router.use("/notifications", notificationRoutes);

router.use("/reactions", reactionRoutes);

router.use("/comments", commentRoutes);

module.exports = router;