var express = require("express");
const app = express();
const Chuong = require("../Models/chuong");
const multer = require("multer");
const Jimp = require("jimp");
const upload = multer({ dest: "uploads/" });
const Sanpham = require("../Models/Sanpham");

app.get("/Addchuong", (req, res) => {
  res.render("Addchuong");
});

app.get("/detail", (req, res) => {
  res.render("detail");
});

app.post("/addchuong", upload.single("imgTheloai"), async (req, res) => {
  const sp = new Chuong(req.body);

  try {
    sp.save();
    res.redirect("/api/getDetail");
  } catch (err) {}
});

app.get("/getDetailchuong", (req, res) => {
  Chuong.find({}).then((chuong) => {
    res.render("detailchuong", {
      titleView: "Thông tin chi tiết",
      chuong: chuong.map((user) => user.toJSON()),
    });
  });
});

app.put("/updateuser/:id", upload.single("image"), async (req, res) => {
  try {
    const { id, namechuong, noidung } = req.body;

    await Chuong.findOneAndUpdate(
      { _id: req.params.id },
      { id, namechuong, noidung }
    );
    res.redirect("/api/getDetail");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi update thông tin người dùng");
  }
});
app.get("/search", async (req, res) => {
  try {
    const Tenuser = req.query.Search;
    // Tìm kiếm trong cơ sở dữ liệu
    const Searchnv = await Theloai.find({
      nameTheloai: { $regex: Tenuser, $options: "i" },
    });

    res.render("detail", {
      sp: Searchnv.map((user) => user.toJSON()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/deletesp/:id", async (req, res) => {
  try {
    const nv = await Chuong.findByIdAndDelete(req.params.id, req.body);
    if (!nv) {
      res.status(404).send("no item");
    } else {
      res.status(404).redirect("/api/getDetail");
    }
  } catch (err) {
    res.status(500).send("error");
  }
});
app.get("/edit/:id", async (req, res) => {
  try {
    const user = await Chuong.findById(req.params.id);
    res.render("update", {
      user: user.toJSON(),
    });
  } catch (err) {}
});

app.get("/getAllchuong", (req, res) => {
  const u = Chuong.find({});
  console.log(u);
  Chuong.find({}).then((Chuong) => {
    res.json(Chuong);
  });
});

app.get("/getDetailchitiet/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Chuong.findById(id).then((Chuongchitiet) => {
    console.log(Chuongchitiet.toJSON());
    res.render("detailch", {
      sp1: Chuongchitiet.toJSON(),
    });
  });
});

module.exports = app;
