const { verifyFakerData } = require("./verify");
const { rows1, data1, data2, data3 } = require("./mockData");

describe("throws error if invalid attribute/subattribute is included", () => {
  it("fails if fake attribute is included", () => {
    expect(() => {
      verifyFakerData(rows1, data1);
    }).toThrow();
  });
  it("fails if fake sub-attribute is included", () => {
    expect(() => {
      verifyFakerData(rows1, data2);
    }).toThrow();
  });
});

describe("returns true if all attributes/sub-attributes are valid", () => {
  it("passes when attributes are valid", () => {
    expect(verifyFakerData(rows1, data3)).toBe(true);
  });
});

describe("rows number entered as input should be a valid integer", () => {
  it("passes if row num is integer", () => {
    expect(verifyFakerData(2, data3)).toBe(true);
  });
  it("failed if row num is not integer", () => {
    expect(() => {
      verifyFakerData(1.7, data3);
    }).toThrow();
    expect(() => {
      verifyFakerData("what", data3);
    }).toThrow();
  });
});
