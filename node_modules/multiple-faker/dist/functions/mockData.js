const data1 = {
  name: ["firstName", "lastName", "jobTitle"],
  testing: ["phoneNumber"],
  random: ["number"]
};

const data2 = {
  name: ["firstName", "lastName", "jobTitle"],
  phone: ["phoneNumber"],
  random: ["number", "testing"]
};

const data3 = {
  name: ["firstName", "lastName", "jobTitle"],
  phone: ["phoneNumber"],
  random: ["number"]
};

const rows1 = 1;
const rows2 = 2;
const rows3 = 100;

module.exports = { data1, data2, data3, rows1, rows2, rows3 };
