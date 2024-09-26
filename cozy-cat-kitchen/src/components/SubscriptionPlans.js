import React, { useState } from 'react';
import './SubscriptionPlans.css';
import DeliveryForm from './DeliveryForm';
import axios from 'axios';

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
    planId: 'razorpay_kitten_plan_id' // Replace with actual Razorpay Plan ID
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
    planId: 'razorpay_cat_plan_id' // Replace with actual Razorpay Plan ID
  }
];

const SubscriptionPlans = () => {
  const [quantities, setQuantities] = useState([1, 1]);  // Quantity for both subscriptions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBuyNow = (subscription) => {
    setSelectedPlan(subscription);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Step 1: Create Razorpay subscription
      const razorpayResponse = await axios.post('/create-razorpay-subscription', {
        planId: selectedPlan.planId,
        email: formData.email,
        phone: formData.phone
      });

      const { subscription_id } = razorpayResponse.data;

      // Step 2: Razorpay Checkout
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        subscription_id: subscription_id,
        name: 'Cozy Cat Kitchen',
        description: selectedPlan.name,
        handler: function (response) {
          alert('Payment Successful!');
          // Shiprocket order creation
          axios.post('/create-shiprocket-order', {
            ...formData,
            cart: [
              {
                name: selectedPlan.name,
                sku: `SUB_${selectedPlan.name.replace(/\s/g, '_').toUpperCase()}`,
                price: selectedPlan.price,
                quantity: quantities[selectedPlan.index]
              }
            ]
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
      alert('Payment failed, please try again.');
    }

    setIsModalOpen(false);
  };

  return (
    <section id="subscription-plans" className="subscription-section">
      <img src={`${process.env.PUBLIC_URL}/images/logo-white.png`} alt="Cozy Cat Kitchen Logo" className="title-logo" />
      <div className="subscription-plans">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="plan-card">
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
              <button onClick={() => setQuantities(prev => {
                const newQuantities = [...prev];
                newQuantities[index] = Math.max(1, newQuantities[index] - 1);
                return newQuantities;
              })}>-</button>
              <input
                type="number"
                value={quantities[index]}
                onChange={(e) => setQuantities(prev => {
                  const newQuantities = [...prev];
                  newQuantities[index] = Math.max(1, Number(e.target.value));
                  return newQuantities;
                })}
                min="1"
              />
              <button onClick={() => setQuantities(prev => {
                const newQuantities = [...prev];
                newQuantities[index] += 1;
                return newQuantities;
              })}>+</button>
            </div>
            <button className="buy-now-button" onClick={() => handleBuyNow(subscription)}>Buy Now</button>
          </div>
        ))}
      </div>
      <DeliveryForm isOpen={isModalOpen} onRequestClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default SubscriptionPlans;
