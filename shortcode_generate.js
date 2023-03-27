function randomIndex(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function generateShortCode() {
  const words =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  let shortCode = "";
  for (let i = 0; i < 5; i++) {
    shortCode += randomIndex(words);
  }
  return shortCode;
}

module.exports = generateShortCode;
