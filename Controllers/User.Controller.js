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
      const hashedPassword = await bcrypt.hash(req.body.confirmPassword, salt);
      await UserModels.findByIdAndUpdate(
        { _id: req.params.id },
        { password: hashedPassword }
      );
      res.send("Cập nhật mật khẩu thành công");
    } catch (error) {
      res.status(500).json("Update That bai");
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
      const password = req.body.password;
      console.log(email);
      console.log(password);
      if (!email || !password) {
        res.status(400).json("Email and password are required");
        return;
      }
      let user = await UserModels.findOne({ email: email });
      if (!user) {
        res.status(401).json("Email or password is incorrect");
        return;
      }
      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && !err) {
          res.json(user);
        } else {
          res.status(401).json("Email or password is incorrect");
        }
      });
    } catch (error) {
      res.status(500).json("Something went wrong");
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
