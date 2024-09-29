import React, { createContext, useState, useContext } from 'react';

// Create the context
const ErrorContext = createContext();

// Custom hook to access error context
export const useError = () => useContext(ErrorContext);

// ErrorProvider component to wrap around the app
export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to set an error message
  const showError = (message) => {
    setErrorMessage(message);
  };

  // Function to clear the error message
  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
