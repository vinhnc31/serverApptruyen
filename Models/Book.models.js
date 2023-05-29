const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Book = new Schema(
  {
    nameBook: String,
    image: String,
    date: String,
    author: String,
    content: String,
    chuong: {
      type: Schema.Types.ObjectId,
      ref: "Chuong",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("book", Book);
