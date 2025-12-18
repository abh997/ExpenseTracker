const { default: mongoose } = require("mongoose");

// Define the structure and validation rules for financial transaction records
const transactionRecordSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
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

// Create a model for persisting transaction records to the database
const TransactionModel = mongoose.model("Expenses", transactionRecordSchema);

module.exports = TransactionModel;
