const express = require("express");
const router = express.Router();
const { addIncome, getIncome, deleteIncome } = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");
// Route for adding a new income record
router.post("/add-income", addIncome);

// Route for fetching all income records
router.get("/income", getIncome);
router.delete("/income/:id", deleteIncome);

router.post("/add-expense", addExpense);

// Route for fetching all expense records
router.get("/expenses", getExpenses);

// Route for deleting an expense by ID
router.delete("/expense/:id", deleteExpense);

module.exports = router;
