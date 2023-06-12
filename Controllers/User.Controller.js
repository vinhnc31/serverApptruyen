const UserModels = require("../Models/User.models");
const { mutipleMongoosetoObject } = require("../Util/mongoose.util");
class UserController {
  sigUpUser(req, res, next) {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
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
  async updateUser(req, res, next) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await buyer.findByIdAndUpdate(
          { _id: req.params.id },
          { password: hashedPassword }
        );
        res.send("Cập nhật mật khẩu thành công");
      } catch (error) {
        res.status(500).json("Update That bai")
      }
  }
  api(req, res, next) {
    UserModels.find({})
      .then((data) => {
        if (!data) {
          res.json("Khong co tai khoan");
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        res.status(500).json("Loi server");
      });
  }
  async LoginUser(req, res, next) {
    try {
      const email = req.body.email;
      console.log(email);
      let users = await UserModels.findOne({ email: email });
      if (!users) {
        res.send("email or password not found");
        return;
      } else {
        users.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            res.json(users);
          }
        });
      }
    } catch (error) {
      res.status(500).json("Loi roi");
    }
  }
  indexUser(req, res) {
    UserModels.find({}).then((user) => {
      res.render("listUser", {
        user: mutipleMongoosetoObject(user),
      });
    });
  }
}
module.exports = new UserController();
