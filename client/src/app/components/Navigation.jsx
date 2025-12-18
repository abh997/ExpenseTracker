"use client"
import React from "react";
import { useRouter } from "next/navigation";

const Navigation = (props) => {
    const router = useRouter();
    const {setActiveTransactionFilter}=props
  return (
    <div className="navigationContainer shadow-lg">
      <h2 className="text-warning">EXPENSE TRACKER</h2>
      <div className="nav-list px-4">
        <div className="d-flex gap-2 text-dark">
            <i className="bi bi-house" />
            <h5 onClick={()=>{router.push('/')}} >Go To Home</h5>
        </div>

        <div className="d-flex gap-2 text-dark">
          <i className="bi bi-bank"></i> <h5 onClick={()=>{setActiveTransactionFilter("Alltransaction")}}>Show All Transaction</h5>
        </div>
        <div className="d-flex gap-2 text-dark">
          <i className="bi bi-cash-coin"></i> <h5 onClick={()=>{setActiveTransactionFilter("IncomeList")}} >Show Only Income Transaction</h5>
        </div>
        <div className="d-flex gap-2 text-dark">
          <i className="bi bi-wallet2"></i>
          <h5 onClick={()=>{setActiveTransactionFilter("ExpenseList")}}>Show Only Expense Transaction</h5>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
