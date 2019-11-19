const db = require("../server/quiries");
const vl = require("../server/validation");
const user_utils = {
  async getallSuppliersData() {
    table_name = "supplier";

    // get all data
    const get_all_users_query = await db.quiries.getallData(table_name,{},{});
    console.log(get_all_users_query)
    if (get_all_users_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_users_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_all_users_query
      };
    }
  }
};

exports.user_utils = user_utils;
