const express = require("express");
const routes = express.Router();
const userController = require("../Controllers/User.Controller");

routes.post("/addUser", userController.addUser);
routes.post("/login", userController.LoginUser);

module.exports = routes;
