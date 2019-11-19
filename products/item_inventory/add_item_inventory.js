const db = require("../../server/quiries");
const get_item_category_data = require("../item_categories/search_item");
const modifi_item_category_data = require("../item_categories/modifi_item");
const server_utils = require("../../extra/server_utils");
async function addItemInventory(response) {
  const table_name = "physical_item";
  const table_name2 = "item_categories";
  // check item already exist in database or not
  const exist_res = await db.quiries.isExist(
    table_name2,
    {},
    { barcode: response.item_barcode }
  );
  if (!exist_res) {
    return {
      success: false,
      message: "Item already exist in db",
      errors: ["Item already exists"]
    };
  }

  item_category_data = await get_item_category_data.getitemData({
    barcode: response.item_barcode
  });

  response.item_uuid = item_category_data.result.item_uuid;

  current_date = new Date();

  response.storage_time = server_utils.serverUtils.getDuration_days(
    current_date,
    response.storage_time
  );

  in_stock = item_category_data.result.in_stock + response.contain_no;

  mod_res = await modifi_item_category_data.modifiitemData({
    barcode: response.item_barcode,
    in_stock: in_stock
  });

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.physcitem_uuid = uuid;

  // insert item data in data base
  const item_query_res = await db.quiries.insert(table_name, response);

  //error handler class
  if (item_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  // we don't need now item_query_res == null cuz we handle error in above if condition
  //jason in quieres class to detect db error
  if (item_query_res === null) {
    return {
      success: false,
      message: "Item already exist in db",
      errors: ["Item already exists"]
    };
  } else if (item_query_res) {
    return {
      success: true,
      message: "added successful"
    };
  }
}

exports.addItemInventory = addItemInventory;
