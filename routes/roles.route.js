const express = require("express");
const roleController = require("../controllers/role.controller");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.route("/").get(isAuth, roleController.listRoles);

module.exports = router;
