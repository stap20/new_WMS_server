const db = require("../../server/Server");
const outgoingOrder_utils = {
  async getallOutgoingOrdersData() {
    const table_name = "outgoing_order";
    const joined_table = "customer";

    response = {
      status: "",
      outgoing_order_uuid: "",
      outgoing_order_id: "",
      out_date: "",
      revenue: "",
      "name\" as \"customer_name": "",
      employee_supervisor_uuid: "",  //this uuid for supervisor will handle it later after handle login
      expected_departure_date: ""
    }

    // get all data
    const get_all_outgoing_orders_query = await db.quiries.join_query(
      table_name,
      response,
      "inner",
      joined_table,
      { 'incomming_order.supplier_uuid': 'supplier.supplier_uuid' }
    );
    if (get_all_outgoing_orders_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_outgoing_orders_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_all_outgoing_orders_query
      };
    }
  }
};

exports.outgoingOrder_utils = outgoingOrder_utils;
