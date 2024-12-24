const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const app = express();

app.get("/test", (req, res) => {
    const result = pool.query("SELECT idTest FROM test WHERE idTest = 1");
   // return result;
  res.send(result.idTest);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "logindb",
  password: "Test@123"
});

module.exports = pool;

const { Client } = require('pg');

const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { createUser, findUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { register, login };



// const express = require("express");
// const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;

require('dotenv').config();
console.log(process.env.MY_VARIABLE);





