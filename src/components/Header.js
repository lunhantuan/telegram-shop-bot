import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/header.css';

function Header() {
  const navigate = useNavigate(); // Hook to programmatically navigate between pages

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page in history
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo Section */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo" onClick={() => navigate('/')}>
             {/* Clicking on the logo navigates to the homepage */}
             <img 
              src="/images/355.jpg"  // Path to the image
              alt="Logo"
              className="logo-img"  // Optional class for styling
              style={{ width: '100px', height: 'auto' }} // Adjust size as needed
            />
          </div>
          <div className="back-button-container">
            <button onClick={handleBack} className="btn btn-dark back-button">
              Back
            </button>
          </div>
        </div>

        {/* Rectangle with shadow */}
        <div className="rectangle shadow"></div>
      </div>
    </header>
  );
}

export default Header;