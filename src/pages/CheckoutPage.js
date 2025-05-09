import React from 'react';
import { useLocation } from 'react-router-dom';  // To access the passed state
import 'bootstrap/dist/css/bootstrap.min.css';

function CheckoutPage() {
  const location = useLocation();
  const { cart } = location.state || {};  // Extract cart data from the passed state

  const calculateTotal = () => {
    return cart?.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!cart) {
    return <div>No cart data available.</div>;
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-4">Checkout</h1>
        
        {/* Form Section */}
        <form>
          <div className="mb-3">
            <label htmlFor="uniqueId" className="form-label">Unique ID</label>
            <input type="text" className="form-control" id="uniqueId" />
          </div>
          <div className="mb-3">
            <label htmlFor="region" className="form-label">Region</label>
            <select className="form-select" id="region">
              <option>Select place</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="roomNumber" className="form-label">Room Number</label>
            <input type="text" className="form-control" id="roomNumber" />
          </div>
          <div className="mb-3">
            <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
            <textarea className="form-control" id="additionalInfo" rows="3"></textarea>
          </div>
        </form>

        {/* Cart Summary Section */}
        <h3>Your Order</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td><strong>${calculateTotal()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="btn btn-success w-100">Place Order</button>
      </div>
    </div>
  );
}

export default CheckoutPage;
