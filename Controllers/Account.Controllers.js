class AccountController {
  indexLogin = (req, res, next) => {
    res.render("login", { layout: "main" });
  };
  login = (req, res, next) => {
    res.render("detail");
  };
}
module.exports = new AccountController();
