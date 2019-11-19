const { verifyFakerData } = require("./functions/verify");
const { createFakerArray } = require("./functions/create");

const fakerArrayData = (rows, data) => {
  return verifyFakerData(rows, data) ? createFakerArray(rows, data) : null;
};

module.exports = fakerArrayData;
