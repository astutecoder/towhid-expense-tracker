const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mysql = require('mysql');
const {connection} = require("./db/connection")

const cookieParser = require('cookie-parser')
const cors = require('cors');
// const bodyparser = require('body-parser')

const app = express();
const port =  process.env.PORT || 3001;



app.use(express.json());
app.use(cookieParser(process.env.COOKIE_TOKEN));
app.use(cors());


// Connect to MySQL
connection.connect((err) => {


  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

const authRoute = require("./routes/auth.route")
const categoryRoute = require ("./routes/category.route")

app.use("/expense/v1", authRoute);
app.use("/expense/category/v1", categoryRoute);
// Define a simple route
app.get('/', (req, res) => {
  // Example MySQL query
  connection.query('select * from users;', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});