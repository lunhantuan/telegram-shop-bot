import React from 'react';
import { Link } from 'react-router-dom';  // Thêm dòng này để sử dụng Link
import 'bootstrap/dist/css/bootstrap.min.css';  // Đảm bảo bạn đã cài Bootstrap
import '../assets/css/header.css';

const products = [
  { id: 1, name: 'Sản phẩm 1', price: 100, description: 'Mô tả sản phẩm 1', imageUrl: 'https://res.cloudinary.com/dtoyvqet9/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1746805993/Untitled-1_jgmpb9.jpg' },
  { id: 2, name: 'Sản phẩm 2', price: 150, description: 'Mô tả sản phẩm 2', imageUrl: '/images/photo_2024-08-19_14-32-45.png' },
  // Thêm các sản phẩm khác nếu cần
];

function CategoryPage() {

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-4">Welcome to Our Store</h1>
        <div className="row">
          {products.map(product => (
            <div className="col-6 col-md-3 mb-4" key={product.id}>
              <div className="card">
                {/* Wrap image in Link to navigate to ProductInfoPage */}
                <Link to={`/product/${product.id}`}>
                  <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">Select</Link> 
                  {/* Điều hướng đến ProductInfo */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;



