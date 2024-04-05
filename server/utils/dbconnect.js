require("dotenv").config();
const mongoose = require("mongoose");

async function connect() {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB Connected . . .");
    })
    .catch((err) => {
      console.log("Catch ERROR : ", err);
    });
}

module.exports.connect = connect;
