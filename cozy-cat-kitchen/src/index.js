import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorProvider } from './ErrorContext';  // Import the ErrorProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorProvider>  
    <App />
  </ErrorProvider>
);

// Lazy load reportWebVitals
if (process.env.NODE_ENV === 'production') {
  import('./reportWebVitals').then(({ reportWebVitals }) => {
    reportWebVitals();
  });
}
