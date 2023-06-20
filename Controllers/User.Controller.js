const UserModels = require("../Models/User.models");
// const usere = require("../Models/User.models")
var bcrypt = require('bcryptjs');
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
      // Kiểm tra xem id và password đã được truyền vào chưa
      if (!req.body.id || !req.body.password) {
        return res.status(400).json("Hãy cung cấp đầy đủ thông tin");
      }
      // Lấy muối từ hàm bcrypt và mã hóa password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Tìm người dùng theo id và cập nhật mật khẩu mới
      const updatedUser = await UserModels.updateOne(
        { _id: req.body.id },
        { password: hashedPassword }
      );
      // Nếu không tìm thấy người dùng, trả về lỗi
      if (!updatedUser) {
        return res.status(404).json("Người dùng không tồn tại");
      }
      // Trả về thông tin người dùng đã được cập nhật thành công
      return res.json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Cập nhật mật khẩu thất bại");
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
