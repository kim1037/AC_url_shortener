# AC_url_shortener

使用 Node.js + Express + MongoDB 製作短網址產生器。

## Screenshot - 畫面截圖

![image](https://user-images.githubusercontent.com/107454420/228463132-71dcfe79-91ae-4bad-9c9a-ebe28873d100.png)

## Features - 功能

1. 使用者可以輸入網址
2. 使用者點擊 convert 後可轉換成短網址及產生 QR code
3. 使用者可以點擊 copy 複製短網址，並跳出複製成功訊息
4. 使用者輸入短網址可跳轉回原網址
5. 使用者輸入同樣的網址，產生的短網址也是一樣的
6. 若沒有輸入 URL，則會顯示錯誤訊息
7. 使用者可以點擊 Download 按鈕，將 QR code 下載至本機中

## Prerequisites - 環境設置

- Node.js
- Express @4.16.4
- Express-handlebars @3.0.0
- Bootstrap @5.1.3
- MongoDB
- mongoose @5.9.7

## Installation and execution - 安裝與執行步驟

1. 開啟 Terminal, Clone 此專案至本機:

```
git clone https://github.com/kim1037/AC_url_shortener.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd AC_url_shortener
```

3. 安裝所需套件

```
npm i express@4.16.4 express-handlebars@3.0.0
```

4. 安裝 mongoose

```
npm i mongoose@5.9.7
```

5. 安裝 nodemon (如已安裝可跳過此步驟)

```
npm install -g nodemon
```

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 當 terminal 出現以下字樣，表示伺服器已啟動

> The server is running on http://localhost:3000
>
> MongoDB connect success!
