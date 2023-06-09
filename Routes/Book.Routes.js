const express = require('express')
const routes = express.Router();
const multer = require("multer");
const bookController = require('../Controllers/Book.Controller')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});
const upload = multer({
  storage,
});
routes.get('/listBook', bookController.indexSp);
routes.get('/addBook', bookController.indexAdd);
routes.post('/addBook',upload.single("file"),bookController.addBook);
routes.put('/:id',upload.single('file'),bookController.update);
routes.get('/:id/edit',bookController.edit);
routes.delete('/:id',bookController.delete);
routes.get('/:id/detail',bookController.detailBook);
routes.get('/:id/addChapter',bookController.indexChapter);
routes.post('/addChapter',bookController.addChapter);
routes.get('/api',bookController.getAPI);
routes.get("/:id/detailChapter",bookController.detailChapter)
routes.get("/:id/detailChapterApi",bookController.detailChapterApi)
module.exports = routes;