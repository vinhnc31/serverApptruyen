const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://congvinh3110:congvinh2003@cluster0.3j7f2kz.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Ket Noi MongoDb Thanh Cong");
  } catch (error) {
    console.log("Ket Noi MongoDb That Bai");
  }
}

module.exports = { connect };
