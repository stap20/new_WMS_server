const { createFakerArray } = require("./create");
const { data3, rows1, rows2, rows3 } = require("./mockData");

describe("data passed in produces an array of objects", () => {
  it("fails if fake attribute is included", () => {
    expect(createFakerArray(rows1, data3)).toHaveLength(1);
    expect(createFakerArray(rows2, data3)).toHaveLength(2);
    expect(createFakerArray(rows3, data3)).toHaveLength(100);
  });
});
