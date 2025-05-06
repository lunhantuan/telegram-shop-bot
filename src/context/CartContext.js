import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Giỏ hàng ban đầu là một mảng trống

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProduct = updatedCart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        updatedCart.push(product);
      }
      return updatedCart;
    });
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (id, type) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          const updatedQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          item.quantity = updatedQuantity > 0 ? updatedQuantity : 1; // Đảm bảo số lượng >= 1
        }
        return item;
      });
      return updatedCart;
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
