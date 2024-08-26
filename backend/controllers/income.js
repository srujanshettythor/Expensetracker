const IncomeSchema = require("../models/incomemd");
const mongoose = require("mongoose");

exports.addIncome = async (req, res) => {
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

  // Create new income entry
  const income = new IncomeSchema({
    title,
    amount: Number(amount), // Ensure amount is a number
    category,
    description,
    date: new Date(date), // Ensure date is correctly formatted
  });

  try {
    await income.save();
    res.status(200).json({ message: "Income added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving income to database" });
  }
};
exports.getIncome = async (req, res) => {
  try {
    // Retrieve all income records from the database
    const incomes = await IncomeSchema.find();

    // Check if any records are found
    if (incomes.length === 0) {
      return res.status(404).json({ message: "No income records found" });
    }

    // Respond with the list of income records
    res.status(200).json({ data: incomes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving income records" });
  }
};

exports.deleteIncome = async (req, res) => {
  const incomeId = req.params.id;

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(incomeId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedIncome = await IncomeSchema.findByIdAndDelete(incomeId);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income record not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income record", error });
  }
};
