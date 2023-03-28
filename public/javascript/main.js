const copyBtn = document.querySelector('#copy-btn')

copyBtn.addEventListener('click', function onCopyBtnClicked(event){
  const newUrl = document.querySelector('#new-url').value
  navigator.clipboard.writeText(newUrl).then(()=>{
    //copy成功顯示訊息
    document.querySelector('#copy-message').classList.remove("copy-message-hide")
  }
  )
})