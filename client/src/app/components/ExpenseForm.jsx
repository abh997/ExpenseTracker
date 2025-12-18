"use client";
import React, { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { AuthContext } from "../Context/AuthContext";

const ExpenseForm = (props) => {
  const { isEditingTransaction, setIsEditingTransaction, transactionId, formFields, setFormFields } = props;
  const { AuthData } = useContext(AuthContext);
  const { createTransaction, modifyTransaction } = useContext(ExpenseContext);

  function handleFormSubmission(e) {
    e.preventDefault();
    let currentDate = new Date();
    let newTransactionRecord = {
      ...formFields,
      userId: AuthData.userId,
      date: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
      Time: `${currentDate.getHours()}-${currentDate.getMinutes()}`,
    };
    createTransaction(newTransactionRecord);
    setFormFields((prev) => {
      return {
        ...prev,
        description: "",
        amount: "",
        type: "Income",
      };
    });
  }

  return (
    <>
      <div className="FormContinaer">
        <h3>
          {isEditingTransaction == false
            ? "ADD TRANSACTION"
            : "UPDATE TRANSACTION"}
        </h3>
        <form onSubmit={handleFormSubmission}>
          <div className="mb-3 w-100">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              autoComplete="off"
              required
              value={formFields.description}
              onChange={(e) => {
                setFormFields((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formFields.amount}
              autoComplete="off"
              required
              onChange={(e) => {
                setFormFields((prev) => {
                  return { ...prev, amount: e.target.value };
                });
              }}
              className="form-control"
            />
          </div>

          <div className="mb-3 w-100">
            <label htmlFor="type" className="form-label">
              Transaction Type
            </label>
            <select
              id="type"
              name="type"
              value={formFields.type}
              className="form-select"
              onChange={(e) => {
                setFormFields((prev) => {
                  return { ...prev, type: e.target.value };
                });
              }}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          {isEditingTransaction == false ? (
            <button type="submit" className="btn btn-primary">
              Add Transaction
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (confirm("Press ok to update Transaction") === true) {
                  let currentDate = new Date();
                  let updatedTransactionRecord = {
                    ...formFields,
                    userId: AuthData.userId,
                    date: `${currentDate.getDate()}-${
                      currentDate.getMonth() + 1
                    }-${currentDate.getFullYear()}`,
                    Time: `${currentDate.getHours()}-${currentDate.getMinutes()}`,
                  };
                  modifyTransaction(transactionId, updatedTransactionRecord);
                  setFormFields((prev) => {
                    return {
                      ...prev,
                      userId: "",
                      description: "",
                      amount: "",
                      type: "Income",
                    };
                  });
                }
                setIsEditingTransaction(false);
              }}
              className="btn btn-primary"
            >
              Update Transaction
            </button>
          )}
        </form>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
