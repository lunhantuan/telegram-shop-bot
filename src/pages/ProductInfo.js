import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';  
import { useCart } from '../context/CartContext';  
import 'bootstrap/dist/css/bootstrap.min.css';
import InputNumber from 'rc-input-number';  // Import thư viện rc-input-number

function ProductInfoPage() {
  const { productId } = useParams();  // Lấy productId từ URL

  const products = [
    { id: 1, name: 'Peppermint Latte', description: 'A refreshing minty coffee!', price: 3, imageUrl: '/images/photo_2024-08-19_14-32-45.png', relatedProducts: [{ id: 2, name: 'Vanilla Latte', price: 5, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }, { id: 3, name: 'Caramel Latte', price: 4.5, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }] },
    { id: 2, name: 'Vanilla Latte', description: 'A smooth vanilla coffee.', price: 5, imageUrl: '/images/photo_2024-08-19_14-32-45.png', relatedProducts: [{ id: 1, name: 'Peppermint Latte', price: 3, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }, { id: 3, name: 'Caramel Latte', price: 4.5, imageUrl: '/images/photo_2024-08-19_14-32-45.png' }] },
  ];

  const product = products.find(p => p.id === parseInt(productId));

  const { addToCart } = useCart(); // Lấy hàm addToCart từ CartContext

  const [quantity, setQuantity] = useState(1); // Quản lý số lượng sản phẩm
  const [isAdding, setIsAdding] = useState(false); // Quản lý trạng thái "đang thêm vào giỏ"
  const [addToCartClicked, setAddToCartClicked] = useState(false); // Quản lý trạng thái đã nhấn "Add to Cart"

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setAddToCartClicked(true); // Khi nhấn "Add to Cart", hiển thị nút "View Cart"
    addToCart({ ...product, quantity });

    // Sau 5 giây, bật lại nút "Add to Cart"
    setTimeout(() => {
      setIsAdding(false);
    }, 5000);
  };

  if (!product) {
    return <div>Product not found!</div>; 
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
            
            {/* Quantity Controls with InputNumber */}
            <div className="d-flex justify-content-start align-items-center">
              <button 
                className="btn btn-danger"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <InputNumber
                className="form-control mx-2"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                style={{ width: '215px' }}
              />
              <button 
                className="btn btn-success"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <div className="d-flex justify-content-between mt-3">
              <button 
                className="btn btn-primary" 
                onClick={handleAddToCart}
                disabled={isAdding}  // Disable button while adding
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>

              {/* View Cart Button */}
              {addToCartClicked && (
                <Link to="/cart" className="btn btn-primary ml-3">View Cart</Link>
              )}
            </div>

            <h4 className="mt-5">Related Products</h4>
            <div className="row">
              {product.relatedProducts && product.relatedProducts.map((item) => (
                <div className="col-6 col-md-4 mb-4" key={item.id}>
                  <div className="card">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                    </Link>
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
