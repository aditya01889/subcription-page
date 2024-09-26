import React from 'react';
import './AssortedMeals.css';  // Import the CSS for this component

const AssortedMeals = () => {
  return (
    <div className="assorted-meals-section">
      <div className="assorted-meals-card">
        <h2>Assorted Meals and Broth</h2>
        <p>A weekly mix of our 4 balanced meal variants and 1 broth:</p>
        <ul>
          <li>🐾 Nourish (Chicken, Pumpkin, Rice)</li>
          <li>🐾 Power (Chicken, Liver, Pumpkin, Rice)</li>
          <li>🐾 Vitality (Chicken, Pumpkin, Oats)</li>
          <li>🐾 Supreme (Chicken, Liver, Pumpkin, Oats)</li>
          <li>🐾 1 Broth Pack (100ml) Essence (Chicken Broth) or Bone Rich (Bone Broth)</li>
        </ul>
        <img src={`${process.env.PUBLIC_URL}/images/product-bundle.png`} alt="Product Bundle" className="product-bundle-image" />
      </div>
     </div> 
  );
};

export default AssortedMeals;
