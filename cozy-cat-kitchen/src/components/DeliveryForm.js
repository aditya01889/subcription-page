import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import './DeliveryForm.css';
import { useError } from '../ErrorContext';  // Import the useError hook
import { debounce } from 'lodash';  // Debouncing with lodash

Modal.setAppElement('#root');  // Set the root element for accessibility

const DeliveryForm = ({ isOpen, onRequestClose, onSubmit, cart }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const { showError, clearError } = useError();  // Get the showError and clearError functions from useError

  // Debounce the input change to avoid excessive re-rendering
  const debouncedHandleChange = useCallback(debounce((name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, 300), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    debouncedHandleChange(name, value);  // Use debounced change handler
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!formData.name || !formData.address || !formData.email || !formData.phone) {
      showError('Please fill out all fields.');  // Show error if form is incomplete
      return;
    }

    // Check if cart has any items
    if (cart.length === 0) {
      showError('Your cart is empty. Please add some items to your cart.');  // Show error if cart is empty
      return;
    }
    
    // Clear any existing errors when proceeding
    clearError();

    // Pass the form data along with the cart to the parent component
    onSubmit({
      ...formData,
      cart  // Include the cart with all selected products and quantities
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="delivery-modal">
      <h2>Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input 
            id="name"
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            aria-label="Enter your name"
            required 
          />
        </label>
        <label htmlFor="address">
          Address:
          <input 
            id="address"
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            aria-label="Enter your address"
            required 
          />
        </label>
        <label htmlFor="email">
          Email:
          <input 
            id="email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            aria-label="Enter your email"
            required 
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <input 
            id="phone"
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            aria-label="Enter your phone number"
            required 
          />
        </label>
        <button type="submit">Proceed to Payment</button>
      </form>
    </Modal>
  );
};

export default DeliveryForm;
