const db = require("../../server/quiries");

async function addincomingOrder(response) {
  const table_name = "incomming_order";

  // check order already exist in database or not
  exist_res = await db.quiries.isExist(
    table_name,
    {},
    { incoming_order_id: response.incoming_order_id }
  );

  if (exist_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: [
        "Order with id: " + response.incoming_order_id + " " + "already exists"
      ]
    };
  }

  //convert to date object
  response.entry_date = new Date(response.entry_date);
  response.expected_arrival_date = new Date(response.expected_arrival_date);

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.incoming_order_uuid = uuid;
  // insert incomingorder data in data base
  const addincoming_order_query_res = await db.quiries.insert(
    table_name,
    response
  );
  if (addincoming_order_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (!addincoming_order_query_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: [
        "Order with id: " + response.incoming_order_id + " " + "already exists"
      ]
    };
  } else if (addincoming_order_query_res) {
    return { success: true, message: "Order added successful" };
  }
}

exports.addincomingOrder = addincomingOrder;
