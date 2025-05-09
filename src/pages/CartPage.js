import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';  // Thêm dòng này để sử dụng Link
import InputNumber from 'rc-input-number';  // Import rc-input-number

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isUpdated, setIsUpdated] = useState(false);
  const [newQuantity, setNewQuantity] = useState({});  // Track new quantity for each item
  const navigate = useNavigate();  // Using useNavigate

  // Đọc giỏ hàng từ localStorage khi trang được tải lại
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage nếu có
    if (storedCart.length > 0) {
      storedCart.forEach(item => {
        setNewQuantity(prev => ({
          ...prev,
          [item.id]: item.quantity // Khôi phục lại số lượng cho từng sản phẩm trong giỏ hàng
        }));
      });
    }
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage mỗi khi có thay đổi
    }
  }, [cart]);

  const handleQuantityChange = (id, type) => {
    // Tìm số lượng hiện tại của sản phẩm
    const currentQuantity = newQuantity[id] || cart.find(item => item.id === id)?.quantity || 1;
    
    // Cập nhật số lượng sau khi tăng hoặc giảm
    const updatedQuantity = type === 'increase' ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);
    
    // Cập nhật số lượng mới vào state
    setNewQuantity(prev => ({ ...prev, [id]: updatedQuantity }));
    setIsUpdated(true);  // Đánh dấu giỏ hàng đã thay đổi
  
    // Cập nhật lại toàn bộ giỏ hàng trong localStorage trước khi thay đổi số lượng
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: updatedQuantity } : { ...item, quantity: newQuantity[item.id] || item.quantity }
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Lưu giỏ hàng vào localStorage
  };
  
  const handleInputChange = (value, id) => {
    // Nếu ô nhập trống, gán số lượng là 1
    const newValue = value === "" ? 1 : Math.max(1, parseInt(value));
  
    // Lưu lại số lượng mới vào state
    setNewQuantity(prev => ({ ...prev, [id]: newValue }));
    setIsUpdated(true);  // Đánh dấu giỏ hàng đã thay đổi
  
    // Cập nhật lại toàn bộ giỏ hàng trong localStorage
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newValue } : { ...item, quantity: newQuantity[item.id] || item.quantity }
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Lưu giỏ hàng vào localStorage
  };

  const handleDelete = (id) => {
    removeFromCart(id);  
    setIsUpdated(true); 
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemQuantity = newQuantity[item.id] !== undefined ? newQuantity[item.id] : item.quantity; // Kiểm tra nếu có newQuantity, nếu không dùng quantity gốc
      return total + item.price * itemQuantity;
    }, 0);
  };

  const handleProceedToCheckout = () => {
    // Trước khi chuyển sang trang checkout, lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart.map(item => ({ ...item, quantity: newQuantity[item.id] || item.quantity }))));
    // Pass cart data to the CheckoutPage via state
    navigate('/checkout', { state: { cart: cart.map(item => ({ ...item, quantity: newQuantity[item.id] || item.quantity })) } });
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-4">Cart</h1>
        <div className="row">
          {cart.map(item => (
            <div className="col-md-6 mb-4" key={item.id}>
              <div className="card">
                <div className="card-body">
                  {/* Đổi tên sản phẩm thành liên kết */}
                  <Link to={`/product/${item.id}`} className="card-title">
                    <h5>{item.name}</h5>
                  </Link>
                  <p>Price: ${item.price}</p>

                  {/* Quantity Controls using rc-input-number */}
                  <div className="d-flex justify-content-start align-items-center">
                    <button className="btn btn-danger" onClick={() => handleQuantityChange(item.id, 'decrease')}>-</button>
                    <InputNumber
                      className="form-control mx-2"
                      value={newQuantity[item.id] !== undefined ? newQuantity[item.id] : item.quantity} // Ensure the correct value is displayed
                      onChange={(value) => handleInputChange(value, item.id)} // Use onChange for rc-input-number
                      min={1}
                      style={{ width: '215px' }}
                    />
                    <button className="btn btn-success" onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
                  </div>

                  {/* Delete Button */}
                  <button className="btn btn-danger mt-2" onClick={() => handleDelete(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Proceed to Checkout */}
        <div className="d-flex justify-content-between">
          <h3>Total: ${calculateTotal()}</h3>
          <div>
            <button
              className="btn btn-success mt-3 ml-2"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
