const mongoose = require('mongoose')

//連接資料庫
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongoDB connect failed!");
});

db.once("open", () => {
  console.log("MongoDB connect success!");
});
module.exports = db