const AccountModels = require("../Models/Account.models");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
class AccountController {
  indexLogin(req, res, next) {
    res.render("login", { layout: "main" });
  }
  signup(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
      console.log(req.body);
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        AccountModels.findOne({
          email: email,
        })
          .then((data) => {
            if (data) {
              res.status(500).json("email da ton tai");
            } else {
              return AccountModels.create({
                email: email,
                username: username,
                password: hashedPass,
              });
            }
          })
          .then((data) => {
            res.status(200).json("Add account successfully ");
          })
          .catch((err) => {
            res.status(500).json("dang ki that bai");
          });
      }
    });
  }
  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    AccountModels.findOne({ email: email })
      .then((data) => {
        if (!data) {
          res.status(404).json("Email khong ton tai");
        } else {
          bcrypt.compare(password, data.password).then((match) => {
            if (match) {
              res.redirect("/Book/listBook");
            } else {
              res.status(550).json("Sai mat khau");
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Dang nhap that bai" });
      });
  }
}
module.exports = new AccountController();
