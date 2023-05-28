var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Chuong = new Schema(
  {
    id: String,
    namechuong: String,
    noidung: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Chuong", Chuong);
