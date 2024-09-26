import React from 'react';
import './SubscriptionPlans.css';

const subscriptions = [
  {
    name: 'Kitten Subscription',
    price: 1499,
    meals: '21 Meals (70 gm each)',
    broth: '1 Broth Pack (100ml)',
    mealsPerDay: '3 Meals a Day',
    delivery: 'Free Weekly Delivery',
    savings: 'Save ₹201/week',
    image: '/images/kitten-box.png',
  },
  {
    name: 'Cat Subscription',
    price: 1799,
    meals: '28 Meals (70 gm each)',
    broth: '2 Broth Packs (100ml each)',
    mealsPerDay: '4 Meals a Day',
    delivery: 'Free Weekly Delivery',
    savings: 'Save ₹261/week',
    image: '/images/cat-box.png',
  }
];

const SubscriptionPlans = () => {
  return (
    <section className="subscription-section">
      <img src="/images/logo-white.png" alt="Cozy Cat Kitchen Logo" className="title-logo" />
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
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className="buy-now-button">Buy Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
