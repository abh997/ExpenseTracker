import React, { useContext, useState } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import style from "./Modal.css";
import Modal from "./Modal";

const TransactionItems = (props) => {
  const { removeTransaction } = useContext(ExpenseContext);
  const { setTransactionId, setIsEditingTransaction, item, setFormFields, formFields } = props;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openConfirmationModal = () => setShowConfirmationModal(true);
  const closeConfirmationModal = () => setShowConfirmationModal(false);

  const handleConfirmDelete = () => {
    removeTransaction(item._id);
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className="transaction" key={item._id}>
        <div className="transaction-details">
          <span className="transaction-name">{item.description}</span>
          <div className="transaction-id">
            <span className="transaction-amount">₹ {item.amount}.00</span>
            <span className={`transaction-type transaction-type-${item.type.toLowerCase()}`}>
              {item.type}
            </span>
          </div>
        </div>
        <div className="transaction-timestamp">
          <span className="transaction-date">{item.date}</span>
          <span className="transaction-time">{item.Time}</span>
        </div>

        <div className="transaction-buttons">
          <button
            className="btn btn-warning"
            onClick={() => {
              setIsEditingTransaction(true);
              setTransactionId(item._id);
              setFormFields((prev) => ({
                ...prev,
                description: item.description || "",
                amount: item.amount ?? "",
                type: item.type || "Income",
              }));
            }}
          >
            Update
          </button>
          <button className="delete-btn btn btn-danger" onClick={openConfirmationModal}>
            Delete
          </button>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} handleClose={closeConfirmationModal} >
        <p>Are you sure you want to delete this transaction?</p>
       <div className="d-flex  gap-2  justify-content-end">
       <button onClick={handleConfirmDelete} className="btn btn-warning shadow">
          Confirm
        </button>
        <button onClick={closeConfirmationModal} className="btn btn-danger shadow">
          Cancel
        </button>
       </div>
      </Modal>
    </>
  );
};

export default TransactionItems;
