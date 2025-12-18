import React from "react";
import "./Modal.css";

// Reusable modal component for displaying confirmation dialogs and alerts
const Modal = ({ show, handleClose, children }) => {
  // Dynamically apply CSS class based on modal visibility state
  const modalVisibilityClass = show ? "modal display-block" : "modal display-none";

  return (
    <div className={modalVisibilityClass}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};

export default Modal;
