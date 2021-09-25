const express = require("express");
const userRoute = require("./users.route");
const router = express.Router();

router.use("/auth", userRoute);

module.exports = router;
