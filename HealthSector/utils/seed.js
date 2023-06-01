const Employee = require("../model/Employees");
const bcrypt = require("bcrypt")
const SALT = 10

module.exports.checkUser = async function () {
  const adminExists = await Employee.find({});
  if (!adminExists.length) {
    const password = await bcrypt.hash("123456",SALT)
    const new_data = {
      fullName:"Central Admin",
      email: "test@gmail.com",
      username: "Admin",
      role: "centralAdmin",
      password: password,
    };
    const admin = new Employee(new_data);
    await admin.save();
  }
};

