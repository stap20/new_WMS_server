const db = require("../server/quiries");
async function checkEmpKid(uuid) {
  kind = await db.quiries.check_emp_kind(uuid);
  return kind;
}

exports.checkEmpKid = checkEmpKid;
