const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
    },
    // ⚠️ NOTE: `unique: true` is NOT a validator in Mongoose.
    // It only tells MongoDB to create a unique index on this field.
    // UNIQUE WILL NOT WORK if:
    // 1. The collection already has documents with duplicate values.
    // 2. The unique index was added AFTER documents were created (index not automatically built).
    // 3. The unique index has not been created yet in the database.
    // To fix: remove duplicates and run User.syncIndexes() or createIndex() in MongoDB.
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true, // to have the unique email id
      trim: true, //to remove the spaces before and after
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // validator function only works when the new document(row)
      //  will add to the table, to make it work for updates as well, use "runValidator" as option in "findByIdAndUpdate" method of API
      validate: function (value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please enter valid gender details");
        }
      },
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "This is default about description",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
