const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Book = new Schema(
  {
    nameBook: String,
    image: String,
    date: String,
    author: String,
    content: String,
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "chapter",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("book", Book);
