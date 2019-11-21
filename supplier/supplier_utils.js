const db = require("../server/quiries");
const supplier_utils = {
  async getallSuppliersData() {
    const table_name = "supplier";

    // get all data
    const get_all_suppliers_query = await db.quiries.getallData(table_name,{},{});
    if (get_all_suppliers_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_suppliers_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_all_suppliers_query
      };
    }
  }
};

exports.supplier_utils = supplier_utils;
