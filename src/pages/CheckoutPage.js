import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';  // Thêm dòng này để sử dụng Link
import 'bootstrap/dist/css/bootstrap.min.css';

function CheckoutPage() {
  return (
    <div>
      <div className="container">
        <h1 className="text-center my-4">Checkout</h1>
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

          <h3>Your Order</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product ABC</td>
                  <td>$5</td>
                </tr>
                <tr>
                  <td>Product XYZ</td>
                  <td>$10</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>$15</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="btn btn-success w-100">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;