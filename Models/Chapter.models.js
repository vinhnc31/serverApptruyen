const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapter = new Schema(
  {
    nameChapter: String,
    content: String,
    thuTu : Integer,
    view : Integer,
  },
  { timestamps: true }
);
module.exports = mongoose.model("chapter", chapter);
