const mongoose = require("mongoose");

const URI =
  "mongodb+srv://mishraaishwaryid:nXg5pouF7F37t5ak@nodejsexperiment.8zdaozb.mongodb.net/";
const connectDB = async () => {
  await mongoose.connect(URI);
};

module.exports = connectDB;
