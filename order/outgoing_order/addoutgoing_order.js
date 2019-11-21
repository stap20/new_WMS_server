const db = require("../../server/quiries");

async function addoutgoingOrder(response) {
  const table_name = "outgoing_order";

  // check order already exist in database or not
  exist_res = await db.quiries.isExist(
    table_name,
    {},
    { outgoing_order_id: response.outgoing_order_id }
  );

  if (exist_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: ["Order with id: "+ response.outgoing_order_id + " " + "already exists"]
    };
  }

  //convert to date object
  response.out_date = new Date(response.out_date);
  response.expected_departure_date = new Date(response.expected_departure_date);

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.outgoing_order_uuid = uuid;
  // insert outcomingorder data in data base
  const addoutgoing_order_query_res = await db.quiries.insert(
    table_name,
    response
  );
  if (addoutgoing_order_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (!addoutgoing_order_query_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: ["Order with id: "+ response.outgoing_order_id + " " + "already exists"]
    };
  } else if (addoutgoing_order_query_res) {
    return { success: true, message: "Order added successful" };
  }
}

exports.addoutgoingOrder = addoutgoingOrder;
