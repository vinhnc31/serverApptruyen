const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapter = new Schema(
  {
    nameChapter: String,
    contentChapter: String,
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "book"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("chapter", chapter);
