//載入相關模組
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const generateShortCode = require("./shortcode_generate");
const generateQRCodeURL = require("./qrcode_generate");
const ShortenURL = require("./models/shortenURL");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;
const SERVER = `http://localhost:${PORT}/`;

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

//設定樣板引擎
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//導入路由
app.use(routes);

//監聽伺服器
app.listen(PORT, () => {
  console.log(`The server is running on ${SERVER}`);
});
