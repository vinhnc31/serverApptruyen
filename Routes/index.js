const account = require("./Account.routes");
const book = require("./Book.Routes");
function routes(app) {
  app.use("/", account);
  app.use("/Book", book);
}
module.exports = routes;
