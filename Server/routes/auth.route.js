const express = require("express");
const bcrypt = require("bcrypt");
const { connection } = require("../db/connection");
const jwt = require('jsonwebtoken')

const router = express.Router();



router.post("/register", async (req, res) => {

  const { email, name, password } = req.body;


  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert hashed data into the 'register' table
    const insertQuery = "INSERT INTO users (email, name, password) VALUES (? ,?,?)";
    connection.query(insertQuery, [email, name, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }

      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send("Error hashing password");
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email)
  console.log(password)
  // Retrieve hashed password from the database based on the username
  const selectQuery = 'SELECT id,email, name, password FROM users WHERE email = ?';
  connection.query(selectQuery, [email], async (err, result) => {
    if (err) {
      console.error('Error selecting data:', err);
      res.status(500).send('Error selecting data');
      return;
    }

    console.log("result",result)
    if (result.length === 0) {
      // User not found
      res.status(401).send('Invalid credentials');
      return;
    }

    const user = result[0];
    console.log("user",user)
    console.log("result",result)


    // Compare the provided password with the hashed password in the database
    
    console.log("user password",user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);


    if (passwordMatch) {
      // Passwords match, generate and send a JWT
      const token = jwt.sign({ userid: user.id, username: user.name, useremail: user.email }, 'hasbacfsv', {
        // expiresIn: '1h', // Token expiration time (adjust as needed)
      });

      res.json({ token });
    } else {
      // Invalid password
      res.status(401).send('Invalid credentials');
    }
  });
});
module.exports = router;
