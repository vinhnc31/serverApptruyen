const Book = require("../Models/Book");
const Jimp = require("jimp");

class BookController {
  indexSp = (req, res, next) => {
    Book.find({}).then((sp) => {
      res.render("listBook", {
        titleView: "Thông tin chi tiết",
        sp: sp.map((user) => user.toJSON()),
      });
    });
  };
  indexAdd = (req, res, next) => {
    res.render("addBook");
  };
  addBook = (req, res, next) => {
    const sp = new Book(req.body);
    const imgpath = req.file.path;
    console.log(req.file);
    console.log(imgpath);
    sp.image = imgpath;

    try {
      sp.save();
      res.redirect("/Book/ListBook");
    } catch (err) {
      console.log(err)
    }
  };
  updateBook = async (req,res,next) => {
    try {
      const {nameBook, date, author } = req.body;
      const imgpath = req.file.path;
      const image = await Jimp.read(imgpath);
      const basa64Image = await image.getBase64Async(Jimp.AUTO);
  
      await Book.findOneAndUpdate(
        { _id: req.params.id },
        { Mauser, Tenuser, ageuser, image: basa64Image, ngayxuatban, tacgia }
      );
      res.redirect("/api/getDetail");
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi update thông tin người dùng");
    }
  }
  searchBook = async (req,res,next) => {
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
  }
  editBook = async(req,res) => {
    try {
      const user = await Sanpham.findById(req.params.id);
      res.render("update", {
        user: user.toJSON(),
      });
    } catch (err) {
      console.log(err);
    }
  }
  delete(req, res, next) {
    Book
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
}
module.exports = new BookController();
