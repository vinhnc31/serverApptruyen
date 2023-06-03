const UserModels = require("../Models/User.models");

class UserController {
  sigUpUser(req, res, next) {
    const userName = req.query.userName;
    const email = req.query.email;
    const password = req.query.password;
    UserModels.create({
      email: email,
      userName: userName,
      password: password,
    })
      .then((data) => {
        res.json("Tao tai khoan thanh cong");
      })
      .catch((err) => res.status(400).json("Tao tai khoan that bai"));
  }
  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    UserModels.findOne({ email: email, password: password })
      .then((data) => {
        res.status(220).json("dang nhap thanh cong");
      })
      .catch((err) => {
        res.status(500).json("Dang nhap that bai");
      });
  }
  updateUser(req, res, next) {
    const id = req.param.id;
    const newPassword = req.body.newPassword;
    UserModels.findByIdAndUpdate(id, { password: newPassword })
      .then((data) => {
        res.json("Update thanh cong");
      })
      .catch((err) => res.status(500).json("Update That bai"));
  }
}
module.exports = new UserController();
