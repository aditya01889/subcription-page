import React from 'react';
import './AssortedMeals.css';  // Import the CSS for this component
import { LazyLoadImage } from 'react-lazy-load-image-component';  // Lazy load image component
import 'react-lazy-load-image-component/src/effects/blur.css';  // Optionally add an effect for lazy loading

const AssortedMeals = () => {
  return (
    <div id="assorted-meals" className="assorted-meals-section">
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
        {/* Lazy loading the image */}
        <LazyLoadImage
          alt="Product Bundle"
          height={200}  // You can adjust these
          width={300}   // You can adjust these
          effect="blur"  // Optional blur effect
          src={`${process.env.PUBLIC_URL}/images/product-bundle.webp`}  // Compressed WebP format
          className="product-bundle-image"
        />
      </div>
     </div> 
  );
};

export default AssortedMeals;
