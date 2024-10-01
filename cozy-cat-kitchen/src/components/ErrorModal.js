import React, { useCallback } from 'react';
import Modal from 'react-modal';
import './ErrorModal.css';  // Import CSS for error modal styling
import { useError } from '../ErrorContext';  // Import the useError hook to get error state

Modal.setAppElement('#root');  // Set the root element for accessibility

const ErrorModal = () => {
  const { errorMessage, clearError } = useError();  // Get errorMessage and clearError from context

  // Use useCallback to memoize the handleClose function
  const handleClose = useCallback(() => {
    clearError();  // Clear the error message when closing the modal
  }, [clearError]);

  return (
    <Modal
      isOpen={!!errorMessage}  // Modal is open when there's an error message
      onRequestClose={handleClose}  // Close modal on request
      className="error-modal"
      overlayClassName="error-overlay"
      shouldCloseOnOverlayClick={true}  // Allow closing when clicking outside the modal
      closeTimeoutMS={300}  // Smooth closing animation
    >
      <div className="error-modal-content">
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={handleClose} className="close-button" aria-label="Close Error Modal">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
