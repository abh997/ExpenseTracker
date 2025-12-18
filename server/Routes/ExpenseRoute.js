const express = require("express");
const {
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
  getOnlyIncome,
  getOnlyExepense,
} = require("../Controllers/ExpenseController");
const transactionRouter = express.Router();
transactionRouter.post("/getExpense", getExpense);
transactionRouter.post("/getOnlyIncome", getOnlyIncome);
transactionRouter.post("/getOnlyExepense", getOnlyExepense);
transactionRouter.post("/addExpense", addExpense);
transactionRouter.delete("/deleteExpense/:id", deleteExpense);
transactionRouter.put("/updateExpense/:id", updateExpense);
module.exports = transactionRouter;
