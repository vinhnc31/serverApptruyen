const account = require("./Account.routes");
const book = require("./Book.Routes");
const user = require('./User.routes')
function routes(app) {
  app.use("/", account);
  app.use("/Book", book);
  app.use("/User", user);
}
module.exports = routes;
