import React from 'react';
import './Header.css';

const Header = () => {
  const handleScroll = () => {
    document.getElementById('subscription-plans').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <h1 className="header-title">Cat Food Subscription</h1>
      
      <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Cozy Cat Kitchen Logo" className="logo" />
      
      <div className="join-box">
        <h2>JOIN THE <br /> COZY CAT KITCHEN <br />SUBSCRIPTION!</h2>
        <p>Get fresh, nutritious meals <br />delivered weekly for your cats & kittens.</p>
        <button className="scroll-button" onClick={handleScroll}>Scroll down to Learn More</button>
      </div>
      
      <h1 className="footer-title">Cat Food Subscription</h1>
    </header>
  );
};

export default Header;
