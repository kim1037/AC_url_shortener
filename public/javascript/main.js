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

const convertButton = document.querySelector("#convert-btn");
const form = document.querySelector("#inputUrlForm ");
convertButton.addEventListener("click", function onConvertButtonClicked(event) {
  form.classList.add("was-validated");
  console.log(form.innerHTML)
}); 