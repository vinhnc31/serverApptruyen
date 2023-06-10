const express = require("express");
const routes = express.Router();
const userController = require("../Controllers/User.Controller");
const { route } = require("./Book.Routes");

routes.post("/addUser", userController.sigUpUser);
routes.get("/api", userController.api);
routes.get("/listUser", userController.indexUser);
routes.put("/updateUser",userController.updateUser);
routes.post("/loginUser", userController.LoginUser);
module.exports = routes;
