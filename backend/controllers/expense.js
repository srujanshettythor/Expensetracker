const mongoose = require("mongoose");

const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  // Validation
  if (!title || !amount || !category || !description || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount should be a positive number" });
  }

  // Create new expense entry
  const expense = new ExpenseSchema({
    title,
    amount: Number(amount), // Ensure amount is a number
    category,
    description,
    date: new Date(date), // Ensure date is correctly formatted
  });

  try {
    await expense.save();
    res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving expense to database" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    // Retrieve all expense records from the database
    const expenses = await ExpenseSchema.find();

    // Check if any records are found
    if (expenses.length === 0) {
      return res.status(404).json({ message: "No expense records found" });
    }

    // Respond with the list of expense records
    res.status(200).json({ data: expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving expense records" });
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedExpense = await ExpenseSchema.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense record not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense record", error });
  }
};
