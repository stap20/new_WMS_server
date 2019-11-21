const db = require("../server/quiries");

async function addSupplier(response) {
  const table_name = "supplier";

  // check supplier already exist in database or not
  exist_res = await db.quiries.isExist(table_name, {}, { name: response.name });

  if (exist_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: ["Supplier has name: " + response.name + " " + "already exists"]
    };
  }

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.supplier_uuid = uuid;
  // insert supplier data in data base
  const addSupplier_query_res = await db.quiries.insert(table_name, response);
  if (addSupplier_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (!addSupplier_query_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: ["Supplier has name: " + response.name + " " + "already exists"]
    };
  } else if (addSupplier_query_res) {
    return { success: true, message: "Supplier added successful" };
  }
}

exports.addSupplier = addSupplier;
