import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">CatFoodSubscription</h1>
      
      <img src="./images/logo.png" alt="Cozy Cat Kitchen Logo" className="logo" />
      
      <div className="join-box">
        <h2>JOIN THE <br /> COZY CAT KITCHEN <br />SUBSCRIPTION!</h2>
        <p>Get fresh, nutritious meals <br />delivered weekly for your cats & kittens.</p>
        <button className="scroll-button">Scroll down to Learn More</button>
      </div>
      
      <h1 className="footer-title">CatFoodSubscription</h1>
    </header>
  );
};

export default Header;
