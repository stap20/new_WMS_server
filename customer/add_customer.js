const db = require("../server/quiries");

async function addCustomer(response) {
  const table_name = "customer";

  // check supplier already exist in database or not
  exist_res = await db.quiries.isExist(
    table_name,
    {},
    { name: response.name }
  );

  if (exist_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: ["Customer has name: "+response.name + " " + "already exists"]
    };
  } 

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.customer_uuid=uuid
    // insert customer data in data base
  const addCustomer_query_res = await db.quiries.insert(table_name, response);
  if (addCustomer_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (!addCustomer_query_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: ["Customer has name: "+response.name + " " + "already exists"]
    };
  } else if (addCustomer_query_res) {
    return { success: true, message: "Customer added successful" };
  }
}

exports.addCustomer = addCustomer;
