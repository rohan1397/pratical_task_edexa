const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.route("/register").post(userController.register);
router.route("/").post(userController.login);
router.route("/users").get(isAuth, userController.listUsers);
router.route("/users/:id").delete(isAuth, userController.deleteUser);
router.route("/users/:id").patch(isAuth, userController.updateUser);
module.exports = router;
