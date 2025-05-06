import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoryPage from './pages/CategoryPage';
import ProductInfo from './pages/ProductInfo';
import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer nếu cần

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* Thêm tuyến đường cho Category */}
        <Route path="/product/:productId" element={<ProductInfo />} /> {/* Trang chi tiết sản phẩm */}
        <Route path="/cart" element={<CartPage />} /> {/* Trang giỏ hàng */}
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Trang thanh toán */}
      </Routes>
      <Footer /> {/* Thêm Footer */}
    </Router>
  );
}

export default App;