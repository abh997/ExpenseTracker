"use client";
import React, { useContext, useEffect, useState } from "react";
import Style from "./Transaction.css";
import TransactionItems from "./TransactionItems";
import { ExpenseContext } from "../Context/ExpenseContext";
import { AuthContext } from "../Context/AuthContext";

const TransactionList = (props) => {
  const { setTransactionId, setIsEditingTransaction, activeTransactionFilter, setFormFields } = props;
  const { AuthData } = useContext(AuthContext);

  const {
    transactions,
    fetchTransactions,
    fetchIncomeTransactions,
    fetchExpenseTransactions,
  } = useContext(ExpenseContext);

  // Load transactions based on the active filter
  useEffect(() => {
    const userIdentifier = { userId: AuthData.userId };
    if (activeTransactionFilter === "IncomeList") {
      fetchIncomeTransactions(userIdentifier);
    } else if (activeTransactionFilter === "ExpenseList") {
      fetchExpenseTransactions(userIdentifier);
    } else {
      fetchTransactions(userIdentifier);
    }
  }, [activeTransactionFilter, AuthData.userId]);

  // Pagination state management
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const recordsPerPage = 5;

  // Calculate pagination values
  const totalPageCount = Math.ceil(transactions.length / recordsPerPage);

  // Extract transactions for current page
  const lastRecordIndex = currentPageNumber * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;
  const pageTransactions = transactions.slice(firstRecordIndex, lastRecordIndex);

  // Parse date string into comparable Date object
  const convertDateStringToDate = (dateValue) => {
    if (!dateValue) return null;
    const dateParts = `${dateValue}`.split("-");
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateValue);
  };

  // Sort transactions by date in descending order
  const sortTransactionsByDate = (transactionList) => {
    return [...transactionList].sort((transactionA, transactionB) => {
      const dateA = convertDateStringToDate(transactionA.date);
      const dateB = convertDateStringToDate(transactionB.date);
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateB - dateA;
    });
  };

  const sortedTransactionList = sortTransactionsByDate(pageTransactions);

  // Navigate to specific page
  const navigateToPage = (pageNumber) => setCurrentPageNumber(pageNumber);

  // Calculate financial totals
  let totalBalance = 0;
  let totalIncomeAmount = 0;
  let totalExpenseAmount = 0;
  
  transactions.forEach((record) => {
    const amountValue = Number(record.amount) || 0;
    if (record.type === "Income") {
      totalIncomeAmount += amountValue;
      totalBalance += amountValue;
    } else {
      totalBalance -= amountValue;
      totalExpenseAmount += amountValue;
    }
  });

  return (
    <>
      <div className="headercontainer">
        <div className="totals">
          <div className="total income shadow-lg">
            <h5 className="text-warning">Total Income</h5>
            <p id="total-income">₹ {totalIncomeAmount}.00</p>
          </div>
          <div className="total expenses shadow-lg">
            <h5 className="text-danger">Total Expenses</h5>
            <p id="total-expenses">₹ {totalExpenseAmount}.00</p>
          </div>
          <div className="total balance  text-success shadow-lg">
            <h5>Total Balance</h5>
            <p id="total-balance">₹ {totalBalance}.00</p>
          </div>
          <div className="total balance shadow-lg">
            <h5>Hello,</h5>
            <p id="total-balance">{AuthData.Username}</p>
          </div>
        </div>
      </div>
      <div className="container shadow-lg">
      <div className="transaction-list">
          {sortedTransactionList.length === 0 ? (
            <h2 className="text-dark">No Transaction To Show</h2>
          ) : (
            sortedTransactionList.map((item) => {
              return (
                <TransactionItems
                  key={item._id}
                  item={item}
                  setIsEditingTransaction={setIsEditingTransaction}
                  setTransactionId={setTransactionId}
                  setFormFields={setFormFields}
                  formFields={props.formFields}
                />
              );
            })
          )}
        </div>
        <div className="contianer-fluid d-flex justify-content-center align-content-center ">
        <div className="pagination w-25  d-flex justify-content-center align-content-center gap-2" >
        
          { transactions.length>5 ?
            
            [...Array(totalPageCount)].map((_, index) => (
            <button 
              key={index + 1}
              onClick={() => navigateToPage(index + 1)}
              className={currentPageNumber === index + 1 ? "active btn btn-sm btn-outline-warning shadow" : "btn btn-sm btn-outline-warning shadow"}
            >
              {index + 1}
            </button>
          )) :""}
         
        </div>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
