const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Account = new Schema(
  {
    email : String,
    username : String,
    password : String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("account", Account);
