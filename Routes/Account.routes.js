const express = require('express')
const route = express.Router()
const accountController = require('../Controllers/Account.Controllers')

route.use(express.json());
route.get('/',accountController.indexLogin);
route.post('/login',accountController.login);
module.exports = route;
