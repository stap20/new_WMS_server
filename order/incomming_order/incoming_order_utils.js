const db = require("../../server/quiries");
const incomingOrder_utils = {
  async getallIncomingOrdersData() {
    const table_name = "incomming_order";
    const joined_table = "supplier";

    response = {
      status: "",
      incoming_order_uuid: "",
      incoming_order_id: "",
      entry_date: "",
      total_paid: "",
      "name\" as \"supplier_uuid": "",
      employee_supervisor_uuid: "",  //this uuid for supervisor will handle it later after handle login
      expected_arrival_date: ""
    }

    // get all data
    const get_all_incoming_orders_query = await db.quiries.join_query(
      table_name,
      response,
      "inner",
      joined_table,
      { 'incomming_order.supplier_uuid': 'supplier.supplier_uuid' }
    );
    if (get_all_incoming_orders_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_incoming_orders_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_all_incoming_orders_query
      };
    }
  }
};

exports.incomingOrder_utils = incomingOrder_utils;

