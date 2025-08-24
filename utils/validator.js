function isNumber(str) {
  return /^-?\d+(\.\d+)?$/.test(str);
}

module.exports = { isNumber };
