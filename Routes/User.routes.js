const express = require("express");
const routes = express.Router();
const userController = require("../Controllers/User.Controller");

routes.post("/addUser", userController.sigUpUser);
routes.get("/api", userController.api);
routes.put("/updateUser",userController.updateUser);

module.exports = routes;
