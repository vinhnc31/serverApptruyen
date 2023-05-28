const express = require('express')
const routes = express.Router();
const multer = require("multer");
const bookController = require('../Controllers/Book.Controller')
const storage = multer.diskStorage({
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
  const upload = multer({ storage: storage });
routes.get('/listBook', bookController.indexSp);
routes.get('/addBook', bookController.indexAdd);
routes.post('/addBook',upload.single("image"),bookController.addBook);
routes.put('/updateBook/:id',bookController.updateBook);
routes.get('/search',bookController.searchBook);
routes.delete('/deleteBook/:id',bookController.delete);
module.exports = routes;