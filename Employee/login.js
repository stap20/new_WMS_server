const utils = require("./utils");

async function login(response) {
  table_name = "employee_account";
  // check if user exist data in data base
  var login_res = await utils.user_utils.getuserData(response.email, response.password);
  if (login_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (login_res.result!==null){
    login_res.details = {
      success: true,
      message: "Welcome back " + response.email
    };
  }

  return login_res;
}

exports.login = login;
