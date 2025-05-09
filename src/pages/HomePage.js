import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Đảm bảo bạn đã cài Bootstrap
import { Link } from 'react-router-dom';  // Thêm dòng này để sử dụng Link
import Header from '../components/Header';
import Footer from '../components/Footer';


function HomePage() {
    const categories = ['Coffee', 'Tea & Beverages', 'Desserts', 'New Products'];
  
    return (
      <div>
      <div className="container">
        <h1 className="text-center my-4">Categories</h1>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div className="card">
                {/* Wrap the image in a Link component to navigate to category page */}
                <Link to={`/category/${category}`}>
                  <img 
                    src={`/images/photo_2024-08-19_14-32-45.png`} 
                    className="card-img-top" 
                    alt={category} 
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{category}</h5>
                  <Link to={`/category/${category}`} className="btn btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }
  
  export default HomePage;