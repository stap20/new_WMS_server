const db = require("../server/quiries");

async function add_worker(response) {
  table_name = "employee_worker";

  // check worker already exist in database or not
  exist_res = await db.quiries.isExist(
    table_name,
    {},
    { employee_worker_ssn: response.employee_worker_ssn }
  );

  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.employee_worker_uuid = uuid;
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
      errors: [response.firstname + response.lastname + " " + "already exists"]
    };
  } else if (addworker_query_res) {
    return { success: true, message: "Worker added successful" };
  }
}

exports.add_worker = add_worker;
