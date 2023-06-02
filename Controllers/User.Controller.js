const User = require('../Models/User.models')
class UserController {
  addUser(req, res, next) {
    const user = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
    });
    console.log(req.body)
    try {
      user.save();
      res.json("Add thanh cong");
    } catch (err) {
      console.log(err);
    }
  }

  LoginUser(req, res, next) {
    try {
      const email = req.body.email;
      console.log(email);
      let users = User.findOne({ email: email });
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
      console.log(error);
    }
  }
}
module.exports = new UserController();
