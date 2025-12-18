import { React, useState, useContext, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import Navigation from "./Navigation";
import TransactionList from "./TransactionList";

const Expense = (props) => {
  const { userLoggedIn } = props;
  const [isEditingTransaction, setIsEditingTransaction] = useState(false);
  const [activeTransactionFilter, setActiveTransactionFilter] =
    useState("Alltransaction");

  const [transactionId, setTransactionId] = useState("");
  const [formFields, setFormFields] = useState({
    description: "",
    amount: "",
    type: "Income",
    date: "",
    Time: "",
  });

  return (
    <>
      <div className="Main p-2">
        <div className="formNavContainer">
          <Navigation
            setActiveTransactionFilter={setActiveTransactionFilter}
          />
          <ExpenseForm
            isEditingTransaction={isEditingTransaction}
            transactionId={transactionId}
            userLoggedIn={userLoggedIn}
            setIsEditingTransaction={setIsEditingTransaction}
            formFields={formFields}
            setFormFields={setFormFields}
          />
        </div>
        <div className="transactionContainer">
          <TransactionList
            setFormFields={setFormFields}
            formFields={formFields}
            setIsEditingTransaction={setIsEditingTransaction}
            setTransactionId={setTransactionId}
            activeTransactionFilter={activeTransactionFilter}
          />
        </div>
      </div>
    </>
  );
};

export default Expense;
