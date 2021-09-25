const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/").post(userController.login);

module.exports = router;
