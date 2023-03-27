//載入相關模組
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3000;
const generateShortCode = require("./shortcode_generate");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const code = generateShortCode();
  res.render("index", { code });
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
