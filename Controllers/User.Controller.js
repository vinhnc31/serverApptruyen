const UserModels = require("../Models/User.models");
class UserController {
  sigUpUser(req, res, next) {
    const nameUser = req.body.nameUser;
    const email = req.body.email;
    const password = req.body.password;
    UserModels.create({
      email: email,
      nameUser: nameUser,
      password: password,
    })
      .then((data) => {
        res.json("Tao tai khoan thanh cong");
      })
      .catch((err) => res.status(400).json("Tao tai khoan that bai"));
  }
  async LoginUser(req, res, next) {
    try {
      const email = req.body.email;
      console.log(email)

      let users = await UserModels.findOne({ email: email })
      if (!users) {
        res.send("email or password not found")
        return
      } else {
        users.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            res.json(users)
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
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
