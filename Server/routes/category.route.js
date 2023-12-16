const express = require("express");
const bcrypt = require("bcrypt");
const { connection } = require("../db/connection");
const jwt = require("jsonwebtoken");
const { VerifyUser } = require("../helper/verifyuser");
const { v4: uuidv4 } = require("uuid");

const categoryRouter = express.Router();

categoryRouter.post("/post-category", VerifyUser, async (req, res) => {
  const { categoryname } = req.body;
  console.log(req.user);
  const uuid = uuidv4();
  const userid = req.user.userid;
  const insertQuery =
    "INSERT INTO categories (categoryname, userid, uuid) VALUES (?, ?, ?)";
  const fetchQuery = "SELECT * FROM categories WHERE id = LAST_INSERT_ID()";

  connection.query(
    insertQuery,
    [categoryname, userid, uuid],
    (error, results) => {
      
      if (error) {
        console.error("Error inserting data into categories table:", error);
        return res.status(500).send("Error inserting data");
      } else {
        console.log("Category added successfully");
        // res.status(201).json({ message: "Category added successfully" });
      }
    }
  );

  connection.query(fetchQuery, [], (error, results) => {
    console.log("backend result", JSON.stringify(results, null, 2));
    if (error) {
      console.error("Error inserting data into categories table:", error);
      return res.status(500).send("Error inserting ");
    } else {
      console.log("Category added successfully");
    
      res.status(201).json(results);
    }
  });
});

categoryRouter.post("/post-expense", VerifyUser, async (req, res) => {
  const { expensename, categoryId, amount } = req.body;
  const uuid = uuidv4();

  const insertQuery =
    "INSERT INTO expenses (expensename, categoryId, amount, uuid) VALUES (?, ?, ?, ?)";

  connection.query(
    insertQuery,
    [expensename, categoryId, amount, uuid],
    (error, results) => {
      if (error) {
        console.error("Error inserting data into categories table:", error);
        res.status(500).send("Error inserting data");
      } else {
        console.log("Category added successfully");
        res.status(201).json({ message: "Expense added successfully" });
      }
    }
  );
});

categoryRouter.get("/get-expense/:categoryId", VerifyUser, async (req, res) => {
  const categoryId = req.params.categoryId;

  const selectQuery = "SELECT * FROM expenses WHERE categoryId = ?";
  connection.query(selectQuery, [categoryId], (error, results) => {
    if (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Error retrieving categories" });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

categoryRouter.get("/categories/:userid", VerifyUser, async (req, res) => {
  const userId = req.params.userid;

  const selectQuery = "SELECT * FROM categories WHERE userid = ?";
  connection.query(selectQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Error retrieving categories" });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

module.exports = categoryRouter;
