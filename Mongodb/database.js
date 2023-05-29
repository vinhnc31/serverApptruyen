const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Ket Noi MongoDb Thanh Cong");
  } catch (error) {
    console.log("Ket Noi MongoDb That Bai");
  }
}

module.exports = { connect };
