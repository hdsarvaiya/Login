const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const hbs = require("hbs");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../views");
const register_path = path.join(__dirname, "../views/register");
const partials_path = path.join(__dirname, "../partials");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Enables form data parsing

app.use("/public", express.static("public"));
app.use(express.static(static_path));

app.set("view engine", "hbs");
hbs.registerPartials(partials_path);
hbs.registerPartials(register_path);

// Connect to MongoDB using the code from your conn.js file
require("./db/conn"); // Assuming conn.js contains your connection logic

const Register = require("./model/registers"); // Import the Register model
const Todo = require("./model/todoss"); // Import the Todo model

// Fix the property name mismatch:
app.get("/index", (req, res) => {
  res.render("index"); // Use the correct filename 'index'
});

app.get("/register", (req, res) => {
  res.render("register"); // Use the correct filename 'register'
});

app.get("/todo", async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await Todo.find();
    // Render the todo view template with the todos
    res.render("todo", { todos });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/login", (req, res) => {
  res.render("login"); // Use the correct filename 'register'
});
app.get("/", (req, res) => {
  res.render("Home"); // Use the correct filename 'register'
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new Register({
      firstName: req.body.firstName, // Use the correct property name
      lastName: req.body.lastName, // Use the correct property name
      email: req.body.email, // Use the correct property name
      password: req.body.password, // Use the correct property name
      gender: req.body.gender, // Use the correct property name
      phone: req.body.phone, // Use the correct property name
    });

    const registeredUser = await newUser.save();
    console.log("User registered successfully:", registeredUser);
    // res.send('Registration successful!'); // Or redirect to a success page

    res.redirect("/login");
  } catch (error) {
    res.statusCode = 500;
    console.error(error);
    res.send(`Error: ${error}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usermail = await Register.findOne({ email: email });

    if (usermail.password === password) {
      res.render("Home");
    } else {
      res.send("Invalid Email");
    }
  } catch (error) {
    res.send("Invalid Email ID" + error);
  }
});

app.post("/todo", async (req, res) => {
  try {
    const todoData = req.body.todo;

    console.log(todoData);

    const newTodo = new Todo({ todo: todoData });
    await newTodo.save();

    // Redirect back to the todo page to display the newly added todo
    res.redirect("/todo"); // Or you can fetch all todos again and render the page
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

