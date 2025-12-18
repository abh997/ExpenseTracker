"use client";

import axios from "axios";
const { createContext, useReducer } = require("react");

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Default state for the transaction management system
let defaultTransactionState = {
  transactions: [],
};

// Export context for transaction operations
export const ExpenseContext = createContext(defaultTransactionState);

// Reducer function to handle state changes based on dispatched actions
const transactionStateReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };

    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
      };

    default:
      return state;
  }
};

// Provider component for wrapping the application to supply transaction context
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionStateReducer, defaultTransactionState);

  // Fetch all transactions for the authenticated user
  const fetchTransactions = async (body) => {
    try {
      const response = await axios.post(`${API_BASE}/expense/getExpense`, body);
      dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      
    } catch (error) {
      console.log(error);
    }
  };

  // Retrieve only income-categorized transactions
  const fetchIncomeTransactions = async (body) => {
    try {
      const response = await axios.post(`${API_BASE}/expense/getOnlyIncome`, body);
      dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      
    } catch (error) {
      console.log(error);
    }
  };

  // Retrieve only expense-categorized transactions
  const fetchExpenseTransactions = async (body) => {
    try {
      const response = await axios.post(`${API_BASE}/expense/getOnlyExepense`, body);
      dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      
    } catch (error) {
      console.log(error);
    }
  };

  // Create and store a new transaction
  const createTransaction = async (transactionData) => {
    try {
      const response = await axios.post(
        `${API_BASE}/expense/addExpense`,
        transactionData
      );
      dispatch({ type: "ADD_TRANSACTION", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove a transaction from the system
  const removeTransaction = async (id) => {
    try {
      await axios.delete(`${API_BASE}/expense/deleteExpense/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Modify an existing transaction with new information
  const modifyTransaction = async (id, updatedTransactionData) => {
    try {
      const response = await axios.put(
        `${API_BASE}/expense/updateExpense/${id}`,
        updatedTransactionData
      );
      dispatch({ type: "UPDATE_TRANSACTION", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  
  
  return (
    <ExpenseContext.Provider
      value={{
        transactions: state.transactions,
        authenticatorId: state.LoginID,
        fetchTransactions,
        createTransaction,
        removeTransaction,
        modifyTransaction,
        fetchIncomeTransactions,
        fetchExpenseTransactions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
