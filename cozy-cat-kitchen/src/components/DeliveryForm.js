import React, { useState } from 'react';
import Modal from 'react-modal';
import './DeliveryForm.css';

Modal.setAppElement('#root');  // Set the root element for accessibility

const DeliveryForm = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="delivery-modal">
      <h2>Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <button type="submit">Proceed to Payment</button>
      </form>
    </Modal>
  );
};

export default DeliveryForm;
