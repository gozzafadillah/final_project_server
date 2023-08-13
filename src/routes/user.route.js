const express = require("express");
const UserController = require("../controllers/user.controller");

function SetupUserRoutes() {
  const router = express.Router();
  const userController = new UserController();

  router.post("/signup", userController.createUser.bind(userController));
  router.post("/signin", userController.login.bind(userController));

  return router;
}

module.exports = SetupUserRoutes;
