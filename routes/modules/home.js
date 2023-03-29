// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const ShortenURL = require("../../models/shortenURL");
const generateShortCode = require("../../shortcode_generate");
const generateQRCodeURL = require("../../qrcode_generate");
const urlExistSync = require("url-exist-sync");

const PORT = process.env.PORT || 3000;
const SERVER = `http://localhost:${PORT}/`;

//設定路由
router.get("/", (req, res) => {
  res.render("index");
});

//轉換按鈕
router.post("/", (req, res) => {
  const ori_url = req.body.originalURL;
  let path = generateShortCode();
  const new_url = SERVER + path;
  const qrCode = generateQRCodeURL(ori_url);
  let urlNotExists = urlExistSync(ori_url); //T or F

  if (!urlNotExists) {
    //如果url不存在, 顯示錯誤訊息
    urlNotExists = true;
    return res.render("index", { ori_url, urlNotExists });
  }
  // 用遞迴函式來檢查是否有重複的5碼
  function checkPath() {
    ShortenURL.exists({ path }).then((result) => {
      if (result) {
        //如已存在，重新產生一個path
        path = generateShortCode();
        checkPath(); //呼叫自己重新檢查
      } else {
        // 如不存在先查詢是否已經存在相同的 ori_url
        ShortenURL.findOne({ ori_url })
          .then((data) => {
            if (data) {
              //若已經存在相同的 ori_url，回傳該筆資料
              res.render("index", {
                new_url: data.new_url,
                ori_url: data.ori_url,
                qrCode,
              });
            } else {
              //如果不存在，則創立一個新的
              ShortenURL.create({ ori_url, path, new_url })
                .then(() => {
                  res.render("index", { ori_url, new_url, qrCode });
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }
    });
  }
  checkPath();
});

//輸入短網址後導回原網址
router.get("/:path", (req, res) => {
  const path = req.params.path;
  ShortenURL.findOne({ path })
    .lean()
    .then((URL) => res.redirect(URL.ori_url))
    .catch((e) => console.log(e));
});

module.exports = router;
