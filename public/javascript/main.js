//點擊 copy button 複製內容
const copyBtn = document.querySelector("#copy-btn");

copyBtn.addEventListener("click", function onCopyBtnClicked(event) {
  const newUrl = document.querySelector("#new-url").value;
  navigator.clipboard.writeText(newUrl).then(() => {
    //copy成功顯示訊息
    document
      .querySelector("#copy-message")
      .classList.remove("copy-message-hide");
  });
});

//QR code下載 
//無法直接在html的a標籤中加入download來下載，因為瀏覽器會顧及安全性問題，而禁止跨域下載。所以必須以img標籤做跨域圖片載入，並繪製到canvas後，再進行下載。
function downloadQRCode() {
  const qrCodeImage = document.getElementById("qr-code");
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let img = document.createElement("img");
  //當圖像加載完成時，onload事件將被觸發
  img.onload = () => {
    //使用canvas元素來繪製QR code
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    const url = canvas.toDataURL(); //將圖像轉換為DataURL格式
    const a = document.createElement("a");
    a.href = url;
    a.download = "QR-Code.png";
    a.click(); //模擬click事件, 將會下載圖片至本機中
  };
  img.crossOrigin = "anonymous"; //防止跨域請求被阻止
  img.src = qrCodeImage.src;
}

//QR code link copy
const qrCopyBtn = document.querySelector("#qr-code-copy");

qrCopyBtn.addEventListener("click", function onQRCopyBtnClicked(event) {
  const qrCodeUrl = document.querySelector("#qr-code").src;
  navigator.clipboard.writeText(qrCodeUrl)
});

//QR code link copy成功訊息
const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});