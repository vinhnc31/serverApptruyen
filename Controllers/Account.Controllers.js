const Account = require("../Models/Account.models");
const bcrypt = require("bcryptjs");
class AccountController {
  indexLogin(req, res, next) {
    res.render("login", { layout: "main" });
  }
  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    Account.findOne({ email: email })
      .then((data) => {
        console.log(data)
        if (data) {
          console.log(password, data.password);
          bcrypt.compare(password, data.password).then((user) => {
            console.log(user);
            if (user) {
              var token = jwt.sign({ _id: data._id }, "mk");
              console.log(token)
            } else {
              return res.json("sai password");
            }
          });
        } else {
          return res.json("that bai");
        }
      })
      .catch((err) => {
        res.status(500).json("loi sv");
      });
  }
}
module.exports = new AccountController();
