const TransactionModel = require("../Model/ExpenseModel");

// Retrieve all transactions associated with a specific user
exports.getExpense = async (req, res) => {
  try {
    const { userId } = req.body;
    const allUserTransactions = await TransactionModel.find({ userId: userId });
    if (allUserTransactions) {
      res.send(allUserTransactions);
    } else {
      res.send("Transaction not founded");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};


// Fetch only income transactions for a given user
exports.getOnlyIncome = async (req, res) => {
  try {
    const { userId } = req.body;
    const allUserTransactions = await TransactionModel.find({ userId: userId });
    if (allUserTransactions) {
      const incomeTransactions = allUserTransactions.filter(
        (transaction) => transaction.type === "Income"
      );
      res.send(incomeTransactions);
    } else {
      res.send("Income Transactions not founded");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};


// Fetch only expense transactions for a given user
exports.getOnlyExepense = async (req, res) => {
  try {
    const { userId } = req.body;
    const allUserTransactions = await TransactionModel.find({ userId: userId });
    if (allUserTransactions) {
      const expenseTransactions = allUserTransactions.filter(
        (transaction) => transaction.type === "Expense"
      );
      res.send(expenseTransactions);
    } else {
      res.send("Expense Transactions not founded");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};


// Create and save a new transaction record in the database
exports.addExpense = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    const savedTransaction = await newTransaction.save();
    res.send(savedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};


// Remove a transaction record from the database by its unique identifier
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const removedTransaction = await TransactionModel.findByIdAndDelete(id);
    if (!removedTransaction) {
      return res.status(404).json({ deleted: false, message: "Transaction not found" });
    }
    console.log("Transaction has been deleted", removedTransaction);
    res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ deleted: false, message: "Server error" });
  }
};


// Modify an existing transaction record with new values
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedTransactionData = req.body;
    const modifiedTransaction = await TransactionModel.findByIdAndUpdate(id, updatedTransactionData, { new: true });
    if (!modifiedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(modifiedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

