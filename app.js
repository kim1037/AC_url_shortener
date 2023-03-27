//載入相關模組
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const generateShortCode = require("./shortcode_generate");
const ShortenURL = require("./models/shortenURL");
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

app.use(express.urlencoded({ extended: true }));

//設定路由
app.get("/", (req, res) => {
  res.render("index");
});

//輸入短網址後導回原網址
app.get("/:path", (req, res) => {
  const path = req.params.path;
  ShortenURL.findOne({ path: path })
    .lean()
    .then((URL) =>res.redirect(URL.ori_url))
    .catch((e) => console.log(e));
});

//轉換按鈕
app.post("/shorten", (req, res) => {
  const ori_url = req.body.originalURL;
  const path = generateShortCode();
  const new_url = SERVER + path;
  ShortenURL.create({ ori_url, path, new_url })
    .then(() => {
      res.render("index", { new_url });
    })
    .catch((e) => console.log(e));
});

//監聽伺服器
app.listen(PORT, () => {
  console.log(`The server is running on ${SERVER}`);
});
