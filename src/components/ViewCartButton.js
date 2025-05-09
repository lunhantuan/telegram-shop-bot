import React from 'react';
import { useCart } from '../context/CartContext'; // Import the CartContext to get the cart data
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaShoppingCart } from 'react-icons/fa'; // Import shopping cart icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is loaded
import '../assets/css/viewCartButton.css';


const ViewCartButton = () => {
  const { cart } = useCart(); // Get the cart items from context

  // Count the number of distinct products in the cart
  const itemCount = cart.length;

  return (
    <div
      className="view-cart-btn d-flex align-items-center justify-content-center"
      style={{
        position: 'fixed',
        right: '10px',
        bottom: '50%',
        transform: 'translateY(50%)',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '50px',
        fontSize: '1.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        cursor: 'pointer',
      }}
    >
      {/* Shopping Cart Icon */}
      <Link to="/cart" className="d-flex align-items-center">
        <FaShoppingCart />
        {/* Display the item count as a badge */}
        {itemCount > 0 && (
          <span
            className="badge rounded-circle bg-danger"
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              fontSize: '0.75rem',
            }}
          >
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default ViewCartButton;
