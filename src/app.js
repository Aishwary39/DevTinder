const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

// Using app.use to use express json middleware all through my application to transform the request data to json else req.body will not able to read it.

app.use(express.json());
app.use(cookieParser());

// 1. Adding a new data to the database
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // validate the data
    validateSignUpData(firstName, emailId, password);

    // encrypt the password
    const saltRounds = 10; // salt round is an alphanumeric string which is been used to generate a hash.

    const passwordHash = await bcrypt.hash(password, saltRounds);

    // creating a new instance of a user
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await newUser.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Failed to register a user : " + error.message);
  }
});

// 2. Login API
app.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Please enter valid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      /**
       * before sending login successful, we will add json web token to cookie and send with the response
       * which will be stored by the browser/postman and should be sent with every other request to authenticate user
       * at the backend level before sending any requested data
       */
      const token = jwt.sign({ id: user._id }, "DevTinder@2025&!"); // second parameter is secret key, for the time it is any random string;
      res.cookie("access_token", token);
      res.send("Login successfull");
    } else {
      throw new Error("Please enter valid email or password");
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error : " + error.message);
  }
});

// 3. Profile API

app.get("/profile", async (req, res) => {
  /**
   * before getting the profile of a particular user, one has to know if it is valid user of not
   * for that we will use JSON Web Token which will be send during login API call to browser/postman
   *
   * and then that token we will store in the cookie
   * (to read that we need cookie-parser npm library to parse, else will return undefined, the same way we used express.json() npm package to parse req.body)
   */

  const cookie = req.cookies;
  try {
    const { access_token } = cookie;
    if (!access_token) {
      throw new Error("Invalid token");
    }
    const decodedToken = jwt.verify(access_token, "DevTinder@2025&!"); // second parameter is same secret key used while login, for the time it is any random string

    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      throw new Error("Invalid token, Please login again");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// 3. Get user by email

app.get("/getUserByEmail", async (req, res) => {
  const email = req.body.email;
  try {
    // will send empty array if no documents exits else send the data in array of object
    const user = await User.find({ emailId: email });
    if (user.length === 0) {
      throw new Error("No User exists with the email id");
    } else {
      res.send(user);
    }
  } catch (error) {
    const message = error.message ? error.message : "Something went wrong";
    res.status(400).send(message);
  }
});

// 4. Get one user always

app.get("/getUniqueUser", async (req, res) => {
  const email = req.body.email;
  try {
    // with blank object it will send any arbitrary random document from the database else will send a document matching the object
    const user = await User.findOne({ emailId: email });
    //const user = await User.findOne({});
    res.send(user);
  } catch (error) {
    res.status(400).send("Some error occurred");
  }
});

// 5. Get all users

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Some error occurred");
  }
});

// 6. Delete a user by id

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    //const deletedUser =  await User.findOneAndDelete(userId) // both are same thing
    if (deletedUser) {
      res.send("User deleted successfully");
    } else {
      res.send("User doesn't exists");
    }
  } catch (error) {
    res.status(400).send("Some error occurred");
  }
});

// 7. Update a user by id

app.patch("/user/:userId", async (req, res) => {
  // it will be more beneficial to read the id from the parameters instead of body else id can also get changed if tried
  //const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;
  console.log(userId);
  try {
    // Fields which are allowed to update, eg emailId can not be updated, it should be fixed always
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "skills",
      "password",
      "photoUrl",
      "about",
    ];

    const isUpdateAllowed = Object.keys(data).every((item) => {
      return ALLOWED_UPDATES.includes(item);
    });

    if (!isUpdateAllowed) {
      throw new Error("Certain fields are not allowed to update");
    }
    const { skills } = data;

    if (skills && skills?.length > 10) {
      throw new Error("Skills shouls be less than 10.");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data);
    //const updatedUser = User.findByIdAndUpdate({_id: userId}, data); // both lines are same thing
    /**
     * without options parameter (before/after) in findOneAndUpdate, updatedUser will return the state of user before the update
     */
    if (updatedUser) {
      res.send("User updated successfully");
    } else {
      res.send("No user exists with the userId");
    }
  } catch (error) {
    res.status(400).send("Failed to update the user : " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully..");
    app.listen(8084, () => {
      console.log("Server is successfully listening on port 8084.");
    });
  })
  .catch((err) => {
    console.log("Database can not be connected... !!!");
  });
