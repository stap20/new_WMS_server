const faker = require("faker");

const createFakerArray = (rows, data) => {
  const fakerArr = [];
  for (let i = 0; i < rows; i++) {
    fakerArr[i] = {};
    for (const attr in data) {
      for (const subattr of data[attr]) {
        fakerArr[i][subattr] = faker[attr][subattr]();
      }
    }
  }
  return fakerArr;
};

module.exports = { createFakerArray };
