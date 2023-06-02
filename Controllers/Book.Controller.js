const Book = require("../Models/Book.models");
const ChapterBook = require("../Models/Chapter.models");
const { mutipleMongoosetoObject } = require("../Util/mongoose.util");
const { MongoosetoObject } = require("../Util/mongoose.util");
class BookController {
  indexSp(req, res, next) {
    Book.find({}).then((sp) => {
      res.render("listBook", {
        sp: mutipleMongoosetoObject(sp),
      });
    });
  }
  indexAdd = (req, res, next) => {
    res.render("addBook");
  };
  addBook(req, res, next) {
    console.log(req.body);
    const book = new Book(req.body);
    const imgPath = req.file.path;
    console.log(req.file);
    console.log(imgPath);
    book.image = imgPath;

    try {
      book.save();
      res.redirect("/Book/ListBook");
    } catch (err) {
      console.log(err);
    }
  }
  async searchBook(req, res, next) {
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
  edit(req, res, next) {
    Book.findById(req.params.id)
      .then((book) => {
        res.render("editBook", {
          book: MongoosetoObject(book),
        });
      })
      .catch(next);
  }
  update(req, res, next) {
    console.log(req.file);
    Book.updateOne(
      { _id: req.params.id },
      {
        nameBook: req.body.nameBook,
        date: req.body.username,
        author: req.body.password,
        content: req.body.content,
        image: req.file.path,
      }
    )
      .then(() => res.redirect("/Book/listBook"))
      .catch(next);
  }
  delete(req, res, next) {
    Book.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
  detailBook(req, res, next) {
    Book.findById(req.params.id)
      .then((book) => {
        res.render("detailBook", {
          book: MongoosetoObject(book),
        });
      })
      .catch(next);
  }
  indexChapter(req, res, next) {
    res.render("addChapter");
  }
  getAPI(req, res, next) {
    Book.find({}).then((sp) => {
      res.json({
        sp: mutipleMongoosetoObject(sp),
      });
    });
  }
  addChapter(req, res, next) {
    console.log("res: ", req.body);
    const chapTer = new ChapterBook(req.body);
    chapTer
      .save()
      .then(() => res.json("them thanh cong"))
      .catch((err) => console.log(err));
  }
}
module.exports = new BookController();
