import React from 'react';
import './ProductCard.css';

const ProductCard = ({ name, price, meals, broth, mealsPerDay, delivery, savings, image, boxIcon }) => {
  return (
    <div className="plan-card">
      <img src={boxIcon} alt={`${name} Subscription`} className="box-icon" />
      <h3>{name}</h3>
      <p>₹{price} / week</p>
      <ul>
        <li>🐾 {meals}</li>
        <li>🐾 {broth}</li>
        <li>🐾 {mealsPerDay}</li>
        <li>🐾 {delivery}</li>
        <li>🐾 {savings}</li>
      </ul>
      <div className="quantity-buttons">
        <button>-</button>
        <span>1</span>
        <button>+</button>
      </div>
      <button className="buy-now-button">Buy Now</button>
    </div>
  );
};

export default ProductCard;
