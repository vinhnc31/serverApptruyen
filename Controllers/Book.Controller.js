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
  Book(req, res, next) {
    Book.find({}).then((book) => {
      console.log(ct);
      res.render("detailBook", {
        book: mutipleMongoosetoObject(book),
      });
    });
  }
  detailChapter(req, res, next) {
    ChapterBook.findById(req.params.id)
      .then((chapter) => {
        res.render("detailChapter",{
          chapter: MongoosetoObject(chapter),
        });
      })
      .catch(next);
  }
  detailChapterApi(req, res, next) {
    ChapterBook.findById(req.params.id)
      .then((chapter) => {
        res.json({
          chapter: MongoosetoObject(chapter),
        });
      })
      .catch(next);
  }
  indexChapter(req, res, next) {
    Book.findById(req.params.id)
      .then((book) => {
        res.render("addChapter", {
          book: MongoosetoObject(book),
        });
      })
      .catch(next);
  }
  getAPI(req, res, next) {
    Book.find({}).then((sp) => {
      res.json({
        sp: mutipleMongoosetoObject(sp),
      });
    });
  }
  async addChapter(req, res, next) {
    try {
      const chapTer = new ChapterBook(req.body);
      const saveChapter = await chapTer.save();
      if (req.body.book) {
        const book = await Book.findById(req.body.book);
        console.log("book", book);
        await book.updateOne({ $push: { chapter: saveChapter._id } });
      }
      res.redirect(`/Book/${req.body.book}/detail`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
}
module.exports = new BookController();
