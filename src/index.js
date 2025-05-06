import React from 'react';
import ReactDOM from 'react-dom/client'; // Import từ react-dom/client
import App from './app';  // Component chính của ứng dụng
import { CartProvider } from './context/CartContext';  // Import CartProvider
import 'bootstrap/dist/css/bootstrap.min.css';

// // React sẽ render ứng dụng vào phần tử có id là 'root' trong index.html
// ReactDOM.render(
//   <React.StrictMode>
//     <App />  {/* Gọi component chính của ứng dụng */}
//   </React.StrictMode>,
//   document.getElementById('root')  // Kết nối với phần tử <div id="root"></div> trong index.html
// );
const root = ReactDOM.createRoot(document.getElementById('root')); // Tạo root
root.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById('root')
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
