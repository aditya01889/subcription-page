import React, { useState } from 'react';
import './SubscriptionPlans.css';
import DeliveryForm from './DeliveryForm';
import { useError } from '../ErrorContext';  // Using the useError hook for global error handling
import axios from 'axios';
import config from '../config';  // Import the config file

const subscriptions = [
  {
    name: 'Kitten Subscription',
    price: 1499,
    meals: '21 Meals (70 gm each)',
    broth: '1 Broth Pack (100ml)',
    mealsPerDay: '3 Meals a Day',
    delivery: 'Free Weekly Delivery',
    savings: 'Save ₹201/week',
    image: `${process.env.PUBLIC_URL}/images/kitten-box.png`,
    planId: 'plan_P16C8fYlOuifli'  // Razorpay Plan ID
  },
  {
    name: 'Cat Subscription',
    price: 1799,
    meals: '28 Meals (70 gm each)',
    broth: '2 Broth Packs (100ml each)',
    mealsPerDay: '4 Meals a Day',
    delivery: 'Free Weekly Delivery',
    savings: 'Save ₹261/week',
    image: `${process.env.PUBLIC_URL}/images/cat-box.png`,
    planId: 'plan_P16CnSJeddGUF3'  // Razorpay Plan ID
  }
];

const SubscriptionPlans = () => {
  const [quantities, setQuantities] = useState([0, 0]);  // Allow zero quantities for both subscriptions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const { showError, clearError } = useError();  // Use the useError hook for error handling

  const updateCart = () => {
    const newCart = subscriptions
      .map((subscription, index) => ({
        name: subscription.name,
        sku: `SUB_${subscription.name.replace(/\s/g, '_').toUpperCase()}`,
        price: subscription.price,
        quantity: quantities[index]
      }))
      .filter(item => item.quantity > 0);  // Filter out items with zero quantity

    if (newCart.length === 0) {
      showError('Please select at least one item to proceed.');
      return;
    }

    setCart(newCart);
    clearError();  // Clear any existing errors
    setIsModalOpen(true);  // Open the delivery form modal
  };

  const handleQuantityChange = (index, value) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(0, Number(value));  // Ensure quantity can't be negative
      return newQuantities;
    });
  };

  const handleFormSubmit = async (formData) => {
    try {
      const promises = cart.map(async (item) => {
        const razorpayResponse = await axios.post(`${config.backendUrl}/create-razorpay-subscription`, {
          planId: subscriptions.find(sub => sub.name === item.name).planId,
          email: formData.email,
          phone: formData.phone
        });

        return razorpayResponse.data.subscription_id;
      });

      const subscriptionIds = await Promise.all(promises);

      const options = {
        key: config.razorpayKey,  // Use key from config
        subscription_id: subscriptionIds[0],  // Using the first subscription ID
        name: 'Cozy Cat Kitchen',
        description: cart.map(item => item.name).join(', '),
        handler: function (response) {
          axios.post(`${config.backendUrl}/create-shiprocket-order`, {
            ...formData,
            cart: cart
          }).catch(err => {
            console.error('Error creating Shiprocket order:', err);
            showError('Order creation failed. Please try again.');
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      showError('Payment failed, please try again.');
    }

    setIsModalOpen(false);
  };

  return (
    <section id="subscription-plans" className="subscription-section">
      <img src={`${process.env.PUBLIC_URL}/images/logo-white.png`} alt="Cozy Cat Kitchen Logo" className="title-logo" />
      <div className="subscription-plans">
        {subscriptions.map((subscription, index) => (
          <div key={index} className={`plan-card ${subscription.name.toLowerCase().includes('kitten') ? 'kitten-subscription' : 'cat-subscription'}`}>
            <img src={subscription.image} alt={subscription.name} className="box-icon" />
            <h3>{subscription.name}</h3>
            <p>₹{subscription.price} / week</p>
            <div className="card-line"></div>
            <ul>
              <li>🐾 {subscription.meals}</li>
              <li>🐾 {subscription.broth}</li>
              <li>🐾 {subscription.mealsPerDay}</li>
              <li>🐾 {subscription.delivery}</li>
              <li>🐾 {subscription.savings}</li>
            </ul>
            <div className="quantity-buttons">
              <button onClick={() => handleQuantityChange(index, quantities[index] - 1)}>-</button>
              <input
                type="number"
                value={quantities[index]}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                min="0"
              />
              <button onClick={() => handleQuantityChange(index, quantities[index] + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <button className="buy-now-button" onClick={updateCart}>
        Buy Now
      </button>
      <DeliveryForm isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} cart={cart} />
    </section>
  );
};

export default SubscriptionPlans;
