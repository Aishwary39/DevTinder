const validator = require("validator");

const validateSignUpData = (firstName, emailId, password) => {
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Enter valid first name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email Id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

module.exports = {
  validateSignUpData,
};
