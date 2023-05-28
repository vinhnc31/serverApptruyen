var express = require("express");
const app = express();
const User = require("../Models/User");
const multer = require("multer");
const Jimp = require("jimp");
const upload = multer({ dest: "uploads/" });

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/addUser", async (req, res) => {
  const sp = new User(req.body);
  try {
    sp.save();
    res.redirect("/api/getDetail");
  } catch (err) {}
});

app.post("/dangnhap", async function (req, res) {
  try {
    const email = req.body.email;
    console.log(email);
    let users = await User.findOne({ email: email });
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
});

app.put("/updateuser/:id", async (req, res) => {
  try {
    const { nameUser, email, password } = req.body;
    const imgpath = req.file.path;
    const image = await Jimp.read(imgpath);
    const basa64Image = await image.getBase64Async(Jimp.AUTO);

    await User.findOneAndUpdate(
      { _id: req.params.id },
      { nameUser, email, imgTheloai: basa64Image }
    );
    res.redirect("/api/getDetail");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi update thông tin người dùng");
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const user = await Theloai.findById(req.params.id);
    res.render("update", {
      user: user.toJSON(),
    });
  } catch (err) {}
});

app.get("/getDetail", (req, res) => {
  User.find({}).then((sp) => {
    res.render("detail", {
      titleView: "Thông tin chi tiết",
      sp: sp.map((user) => user.toJSON()),
    });
  });
});

module.exports = app;
