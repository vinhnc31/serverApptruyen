const express = require('express')
const route = express.Router()
const accountController = require('../Controllers/Account.Controllers')

route.use(express.json());
route.get('/login',accountController.indexLogin);
route.get('/signup',accountController.indexSignup);
route.post('/login',accountController.login);
route.post('/signup',accountController.signup);
module.exports = route;
