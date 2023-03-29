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
function downloadQRCode() {
  const qrCodeImage = document.getElementById("qr-code");
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let img = document.createElement("img");
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    const url = canvas.toDataURL()
    const a = document.createElement("a");
    a.href = url
    a.download = 'QR-Code.png'
    a.click()
  };
  img.crossOrigin='anonymous'
  img.src = qrCodeImage.src;
}
