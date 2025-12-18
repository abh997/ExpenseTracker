const ETmodel = require("../Model/ExpenseModel");

exports.getExpense = async (req, res) => {
  try {
    const { USERID } = req.body;
    const transactionlist = await ETmodel.find({ User_ID: USERID });
    if (transactionlist) {
      res.send(transactionlist);
    } else {
      res.send("Transaction not founded");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.getOnlyIncome = async (req, res) => {
  try {
    const { USERID } = req.body;
    const transactionlist = await ETmodel.find({ User_ID: USERID });
    if (transactionlist) {
      const incomeTransactions = transactionlist.filter(
        (transaction) => transaction.TransactionType === "Income"
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

exports.getOnlyExepense = async (req, res) => {
  try {
    const { USERID } = req.body;
    const transactionlist = await ETmodel.find({ User_ID: USERID });
    if (transactionlist) {
      const expenseTransactions = transactionlist.filter(
        (transaction) => transaction.TransactionType === "Expense"
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

exports.addExpense = async (req, res) => {
  try {
    const newExpense = new ETmodel(req.body);
    const saveExpanse = await newExpense.save();
    res.send(saveExpanse);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await ETmodel.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ deleted: false, message: "Transaction not found" });
    }
    console.log("Transaction has been deleted", transaction);
    res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ deleted: false, message: "Server error" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updateTransaction = req.body;
    const transaction = await ETmodel.findByIdAndUpdate(id, updateTransaction, { new: true });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
