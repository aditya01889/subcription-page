import React, { useState } from 'react';
import Modal from 'react-modal';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; // Corrected import
import { faStore } from '@fortawesome/free-solid-svg-icons'; // Generic shop icon
import policies from '../data/policies.json'; // Import your policy JSON file

const Footer = () => {
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState(''); // State for policy title
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find and open the modal with the correct policy content
  const openModal = (policyTitle) => {
    const policy = policies.find((item) => item.title === policyTitle);
    setModalTitle(policyTitle); // Set modal title
    setModalContent(policy ? policy.content : 'Content not found');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Sitemap</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#subscription-plans">Plans</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="https://www.instagram.com/cozycatkitchen_/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li>
              <a href="https://cozycatkitchen.mini.site/?path=%2F" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faStore} /> Shop
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Policies</h3>
          <ul>
            <li><button onClick={() => openModal('Pricing Policy')}>Pricing Policy</button></li>
            <li><button onClick={() => openModal('Shipping Policy')}>Shipping Policy</button></li>
            <li><button onClick={() => openModal('Terms & Conditions')}>Terms & Conditions</button></li>
            <li><button onClick={() => openModal('Privacy Policy')}>Privacy Policy</button></li>
            <li><button onClick={() => openModal('Cancellation/Refund Policy')}>Cancellation/Refund Policy</button></li>
          </ul>
        </div>

        <div className="footer-column contact">
          <h3>Contact Us</h3>
          <a href="mailto:cozycatkitchen@gmail.com">cozycatkitchen@gmail.com</a>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="policy-modal"
        overlayClassName="policy-modal-overlay"
      >
        <button className="close-modal" onClick={closeModal}>X</button>
        <div className="modal-content">
          <h2>{modalTitle}</h2> {/* Display the policy title */}
          <p>{modalContent}</p>
        </div>
      </Modal>

      <div className="footer-bottom">
        © 2024 Cozy Cat Kitchen. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
