const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Using app.use to use express json middleware all through my application to transform the request data to json else req.body will not able to read it.

app.use(express.json());

// 1. Adding a new data to the database
app.post("/signup", async (req, res) => {
  // creating a new instance of a user
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Some error occurred");
  }
});

// 2. Get user by email

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

// 3. Get one user always

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

// 4. Get all users

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Some error occurred");
  }
});

// 5. Delete a user by id

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

// 6. Update a user by id

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
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
    res.status(400).send("Some error occurred");
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
