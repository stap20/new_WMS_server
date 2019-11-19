const { createFakerArray } = require("./functions/create");
const fakerArrayData = require("./index");
const { data1, data2, data3, rows1, rows2, rows3 } = require("./functions/mockData");

describe("createFakerArray and fakerArrayData comparison", () => {
  it("same num rows succeeds when same data is passed", () => {
    expect(fakerArrayData(rows1, data3)).toHaveLength(createFakerArray(rows1, data3).length);
    expect(fakerArrayData(rows2, data3)).toHaveLength(createFakerArray(rows2, data3).length);
    expect(fakerArrayData(rows3, data3)).toHaveLength(createFakerArray(rows3, data3).length);
  });
  it("fails when different data is passed", () => {
    expect(fakerArrayData(rows1, data3)).not.toHaveLength(createFakerArray(rows2, data3).length);
    expect(fakerArrayData(rows2, data3)).not.toHaveLength(createFakerArray(rows3, data3).length);
    expect(fakerArrayData(rows3, data3)).not.toHaveLength(createFakerArray(rows1, data3).length);
  });
});

describe("throws error if invalid attribute/subattribute is included", () => {
  it("fails if fake sub-attribute is included", () => {
    expect(() => {
      fakerArrayData(rows3, data1);
    }).toThrow();
  });
  it("fails if fake sub-attribute is included", () => {
    expect(() => {
      fakerArrayData(rows1, data2);
    }).toThrow();
  });
});
