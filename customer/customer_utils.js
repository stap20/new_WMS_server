const db = require("../server/quiries");
const customer_utils = {
  async getallCustomersData() {
    const table_name = "customer";

    // get all data
    const get_all_customers_query = await db.quiries.getallData(table_name,{},{});
    if (get_all_customers_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_customers_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_all_customers_query
      };
    }
  }
};

exports.customer_utils = customer_utils;
