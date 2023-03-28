function generateQRCodeURL(ori_url) {
  return `https://chart.googleapis.com/chart?cht=qr&chl=${ori_url}&chs=150x150`;
}

module.exports = generateQRCodeURL;
