import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';  // Import useParams để lấy productId từ URL
import { useCart } from '../context/CartContext';  // Import useCart để thêm sản phẩm vào giỏ
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductInfoPage() {
  const { productId } = useParams();  // Lấy productId từ URL

  // Mock dữ liệu sản phẩm (bạn có thể thay bằng API thật hoặc cơ sở dữ liệu)
  const products = [
    { id: 1, name: 'Peppermint Latte', description: 'A refreshing minty coffee!', price: 3, imageUrl: '/images/photo_2024-08-19_14-32-45.png', relatedProducts: [{ id: 2, name: 'Vanilla Latte', price: 5, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }, { id: 3, name: 'Caramel Latte', price: 4.5, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }] },
    { id: 2, name: 'Vanilla Latte', description: 'A smooth, sweet vanilla coffee.', price: 5, imageUrl: '/images/photo_2024-08-19_14-32-45.png', relatedProducts: [{ id: 1, name: 'Peppermint Latte', price: 3, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }, { id: 3, name: 'Caramel Latte', price: 4.5, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }] },
    // Các sản phẩm khác có thể được thêm vào đây
  ];

  // Tìm sản phẩm dựa trên productId
  const product = products.find(p => p.id === parseInt(productId));

  const { addToCart } = useCart(); // Lấy hàm addToCart từ CartContext

  const [quantity, setQuantity] = useState(1); // Quản lý số lượng sản phẩm

  const handleQuantityChange = (type) => {
    setQuantity(prev => (type === 'increase' ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityInputChange = (e) => {
    // Chỉ cho phép nhập số nguyên và số lớn hơn 0
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });  // Thêm sản phẩm vào giỏ với số lượng đã chọn
  };

  if (!product) {
    return <div>Product not found!</div>; // Trường hợp không tìm thấy sản phẩm
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-4">{product.name}</h1>
        <div className="row">
          <div className="col-md-6">
            <img src={product.imageUrl} className="img-fluid" alt={product.name} />
          </div>
          <div className="col-md-6">
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-danger" onClick={() => handleQuantityChange('decrease')}>-</button>
              <input
                type="number"
                className="form-control w-25"
                value={quantity}
                onChange={handleQuantityInputChange}
                min="1"
              />
              <button className="btn btn-success" onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/cart" className="btn btn-primary ml-3">View Cart</Link> {/* Điều hướng đến giỏ hàng */}
            <h4>Related Products</h4>
            <div className="row">
              {product.relatedProducts && product.relatedProducts.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card">
                    <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p>${item.price}</p>
                      <Link to={`/product/${item.id}`} className="btn btn-primary">View Product</Link> 
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoPage;
