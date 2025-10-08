const mongoose = require("mongoose");

/**
 * devTinder is database name passed inside the connection
 * string itself, it will create a new database
 * if not present else it will use the already present
 */

const URI =
  "mongodb+srv://mishraaishwaryid:nXg5pouF7F37t5ak@nodejsexperiment.8zdaozb.mongodb.net/devTinder";
const connectDB = async () => {
  await mongoose.connect(URI);
};

module.exports = connectDB;
