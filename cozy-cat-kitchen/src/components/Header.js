import React, { useCallback } from 'react';
import './Header.css';
import { useError } from '../ErrorContext';  // Importing the useError hook

const Header = () => {
  const { showError } = useError();  // Access the showError function from the error context

  // Memoize the handleScroll function to prevent unnecessary re-renders
  const handleScrollToPlans = useCallback(() => {
    try {
      document.getElementById('subscription-plans').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      showError('Failed to scroll to the subscription plans section.');
    }
  }, [showError]);

  const handleScrollToAbout = useCallback(() => {
    try {
      document.getElementById('assorted-meals').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      showError('Failed to scroll to the About section.');
    }
  }, [showError]);

  return (
    <header id="home" className="header">
      <div className="header-content">
        {/* Logo acting as the Home link */}
        <a href="/" className="logo-link">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.webp`}
            alt="Cozy Cat Kitchen Logo"
            className="logo"
            onError={() => showError('Failed to load logo image.')}
            loading="lazy"  // Improve performance by lazy loading the logo
          />
        </a>

        {/* Navigation links in the center */}
        <nav className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <button className="nav-link" onClick={handleScrollToPlans}>Plans</button>
          <button className="nav-link" onClick={handleScrollToAbout}>About</button>
        </nav>
      </div>

      <div className="join-box">
        <h2>JOIN THE <br /> COZY CAT KITCHEN <br />SUBSCRIPTION!</h2>
        <p>Get fresh, nutritious meals <br />delivered weekly for your cats & kittens.</p>
        <button className="scroll-button" onClick={handleScrollToPlans}>Scroll down to Learn More</button>
      </div>

      <h1 className="footer-title">Cat Food Subscription</h1>
    </header>
  );
};

export default Header;
