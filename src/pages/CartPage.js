import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';  
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type); // Gọi hàm updateQuantity từ CartContext
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleUpdateCart = () => {
    // Lưu các thay đổi của giỏ hàng nếu cần
    console.log('Giỏ hàng đã được cập nhật');
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-4">Cart</h1>
        <div className="row">
          {cart.map(item => (
            <div className="col-md-6 mb-4" key={item.id}>
              <div className="card">
                <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p>Price: ${item.price}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <button className="btn btn-danger" onClick={() => handleQuantityChange(item.id, 'decrease')}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-success" onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
                    </div>
                    <p>Subtotal: ${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <h3>Total: ${calculateTotal()}</h3>
          <div>
            <button className="btn btn-primary mt-3" onClick={handleUpdateCart}>Update Cart</button>
            <Link to="/checkout" className="btn btn-success mt-3 ml-2">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
