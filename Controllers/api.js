var express = require("express");
const app = express();
const Sanpham = require("../Models/Sanpham");
const multer = require("multer");
const Jimp = require("jimp");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //neu chua co folder thi tao ra folder
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, "uploads/");
    } else {
      cb(new Error("Không phải là ảnh"));
    }
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname;
    arr = fileName.split(".");

    let newFileName = "";

    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        newFileName += arr[i];
      } else {
        // newFileName += ('-' + Date.now() + '.' + arr[i]);
        newFileName += "-" + Date.now() + ".jpeg";
      }
    }
    cb(null, newFileName);
  },
});
var upload = multer({ storage: storage });
//////////
app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/detail", (req, res) => {
  res.render("detail");
});

const getProductsFromDatabase = async () => {
  try {
    const sp = await Sanpham.find({});
    console.log(sp.Tenuser);
    return sp;
  } catch (error) {
    console.log(error);
    return [];
  }
};

app.post("/addUser", upload.single("image"), async (req, res) => {
  const sp = new Sanpham(req.body);
  const imgpath = req.file.path;
  console.log(req.file);
  console.log(imgpath);
  sp.image = imgpath;

  try {
    sp.save();
    res.redirect("/api/getDetail");
  } catch (err) {}
});

app.put("/updateuser/:id", upload.single("image"), async (req, res) => {
  try {
    const { Mauser, Tenuser, ngayxuatban, tacgia } = req.body;
    const imgpath = req.file.path;
    const image = await Jimp.read(imgpath);
    const basa64Image = await image.getBase64Async(Jimp.AUTO);

    await Sanpham.findOneAndUpdate(
      { _id: req.params.id },
      { Mauser, Tenuser, ageuser, image: basa64Image, ngayxuatban, tacgia }
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
    const Searchnv = await Sanpham.find({
      Tenuser: { $regex: Tenuser, $options: "i" },
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
    const nv = await Sanpham.findByIdAndDelete(req.params.id, req.body);
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
    const user = await Sanpham.findById(req.params.id);
    res.render("update", {
      user: user.toJSON(),
    });
  } catch (err) {}
});

app.get("/getDetail", (req, res) => {
  Sanpham.find({}).then((sp) => {
    res.render("detail", {
      titleView: "Thông tin chi tiết",
      sp: sp.map((user) => user.toJSON()),
    });
  });
});
app.get("/getAllsp", (req, res) => {
  const u = Sanpham.find({});
  console.log(u);
  SanPham.find({}).then((SanPham) => {
    res.json(SanPham);
  });
});

app.get("/getDetailsapxep", async (req, res) => {
  // Lấy danh sách sản phẩm từ MongoDB
  const sanpham = await getProductsFromDatabase();

  // Sắp xếp danh sách sản phẩm theo thuộc tính 'gia'

  sanpham.sort((a, b) => a.ageuser - b.ageuser);
  // Render trang chi tiết với danh sách sản phẩm đã sắp xếp
  res.render("detail", {
    sp: sanpham.map((user) => user.toJSON()),
  });
});

app.get("/getDetailchitiet/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Sanpham.findById(id).then((spchitiet) => {
    console.log(spchitiet.toJSON());
    res.render("detailch", {
      sp1: spchitiet.toJSON(),
    });
  });
});

Sanpham.findOne({})
  .populate("chuong")
  .exec()
  .then(function (sanpham) {
    if (sanpham && sanpham.chuong && sanpham.chuong._id) {
      // San pham được tìm thấy và chuong có giá trị và tồn tại _id
      var chuongId = sanpham.chuong._id;
      console.log("ID của chương:", chuongId);
    } else {
      // Không tìm thấy san pham hoặc chuong không có giá trị hoặc không tồn tại _id
      console.log(
        "Không tìm thấy san pham hoặc chuong không có giá trị hoặc không tồn tại _id"
      );
    }
  })
  .catch(function (err) {
    // Xử lý lỗi nếu có
    console.error(err);
  });

module.exports = app;
