//載入相關模組
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const generateShortCode = require("./shortcode_generate");
const ShortenURL = require("./models/shortenURL");
const app = express();
const PORT = process.env.PORT || 3000;
const SHORT_URL = "http://shortenURL.com/";

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

app.use(express.urlencoded({ extended: true }));

//設定路由
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/shorten", (req, res) => {
  const ori_url = req.body.originalURL;
  const path = generateShortCode();
  const newURL = SHORT_URL + path;
  ShortenURL.create({ ori_url, path })
    .then(() => {
      res.render("index", { newURL });
    })
    .catch((e) => console.log(e));
});

//監聽伺服器
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
