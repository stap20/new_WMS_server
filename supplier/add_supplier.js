const db = require("../server/quiries");

async function addSupplier(response) {
  table_name = "supplier";

  // check supplier already exist in database or not
  exist_res = await db.quiries.isExist(
    table_name,
    {},
    { name: response.name }
  );

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.supplier_uuid = uuid;
  // insert user data in data base
  const addworker_query_res = await db.quiries.insert(table_name, response);
  console.log(addworker_query_res)
  if (addworker_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (!addworker_query_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: [response.name + " " + "already exists"]
    };
  } else if (addworker_query_res) {
    return { success: true, message: "Supplier added successful" };
  }
}

exports.addSupplier = addSupplier;
