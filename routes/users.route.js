const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.route("/register").post(userController.register);
router.route("/").post(userController.login);
router.route("/users").get(isAuth, userController.listUsers);

module.exports = router;
