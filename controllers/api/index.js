const router = require("express").Router();

const reactionRoutes = require("./reaction")
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");

router.use("/users", userRoutes);

router.use("/posts", postRoutes);

router.use("/posts", reactionRoutes)

module.exports = router;