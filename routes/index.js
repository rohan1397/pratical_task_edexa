const express = require("express");
const userRoute = require("./users.route");
const roleRoute = require("./roles.route");
const router = express.Router();

router.use("/auth", userRoute);
router.use("/roles", roleRoute);

module.exports = router;
