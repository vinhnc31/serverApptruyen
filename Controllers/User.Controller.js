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
  updateUser(req, res, next) {
    const id = req.param.id;
    const newPassword = req.body.newPassword;
    UserModels.findByIdAndUpdate(id, { password: newPassword })
      .then((data) => {
        res.json("Update thanh cong");
      })
      .catch((err) => res.status(500).json("Update That bai"));
  }
  api(req,res,next) {
    UserModels.find({}).then((data) => {
      if (!data) {
        res.json("Khong co tai khoan");
      }else{
        res.json(data);
      }
      
    }).catch((err) => {
      res.status(500).json("Loi server")
    })
  }
}
module.exports = new UserController();
