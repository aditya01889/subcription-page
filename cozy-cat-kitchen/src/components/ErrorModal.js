import React from 'react';
import Modal from 'react-modal';
import './ErrorModal.css';  // Import CSS for error modal styling
import { useError } from '../ErrorContext';  // Import the useError hook to get error state

Modal.setAppElement('#root');  // Set the root element for accessibility

const ErrorModal = () => {
  const { errorMessage, clearError } = useError();  // Get errorMessage and clearError from context

  const handleClose = () => {
    clearError();  // Clear the error message when closing the modal
  };

  return (
    <Modal
      isOpen={!!errorMessage}  // Modal is open when there's an error message
      onRequestClose={handleClose}  // Close modal on request
      className="error-modal"
      overlayClassName="error-overlay"
    >
      <div className="error-modal-content">
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={handleClose} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
