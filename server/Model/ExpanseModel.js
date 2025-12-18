const { default: mongoose } = require("mongoose");

// Define the schema for expense and income transaction records (alternative naming variant)
const transactionDataSchema = mongoose.Schema(
  {
    User_ID: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    TransactionType: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create model for persisting expense-related transaction records
const AlternateTransactionModel = mongoose.model("Expenses", transactionDataSchema);

module.exports = AlternateTransactionModel;
